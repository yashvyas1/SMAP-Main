import axios from "axios";
import dotenv from "dotenv";
import { FacebookData } from "../../Model/FacebookData.js";
dotenv.config();

const fetchWithPagination = async (url, params) => {
  let allPosts = [];
  let nextPageUrl = url;
  

  while (nextPageUrl) {
    try {
      console.log("nextPageUrl", nextPageUrl)
      console.log(params)
      const response = await axios.get(nextPageUrl, { params });
      console.log("response.data", response)
      allPosts = allPosts.concat(response.data.data);
      
      nextPageUrl =
        response.data.paging && response.data.paging.next
          ? response.data.paging.next
          : null;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      break;
    }
  }
  return allPosts;
};

const calculateGrowth = (newValue, oldValue) => {
  if (oldValue === 0) {
    return newValue > 0 ? 100 : 0;
  }
  return ((newValue - oldValue) / oldValue) * 100;
};

const getFacebookOverviewData = async (userId) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token", "page_name", "page_picture"],
  });
  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;
  const pageName = pageDetails.page_name;
  const pagePicture = pageDetails.page_picture;

  try {
    const response = await axios.get(`https://graph.facebook.com/${pageId}`, {
      params: {
        fields: "id,fan_count,followers_count",
        access_token: pageAccessToken,
      },
    });
    const { fan_count, followers_count } = response.data;
    const totalFollowers = followers_count;
    const totalLikes = fan_count;

    // Fetch all posts with pagination
    const posts = await fetchWithPagination(
      `https://graph.facebook.com/v20.0/${pageId}/posts`,
      {
        fields: "id,likes.summary(true),comments.summary(true),shares",
        access_token: pageAccessToken,
      }
    );
    let totalComments = 0;
    let totalShares = 0;

    posts.forEach((post) => {
      totalComments += post.comments?.summary?.total_count || 0;
      totalShares += post.shares?.count || 0;
    });

    // Retrieve the previous data for comparison
    const previousData = await FacebookData.findOne({
      where: { user_id: userId },
    });

    const previousTotalFollowers = previousData.total_followers;
    const previousTotalPosts = previousData.total_posts;
    const previousTotalLikes = previousData.total_likes;
    const previousTotalComments = previousData.total_comments;
    const previousTotalShares = previousData.total_shares;

    if (
      previousTotalFollowers === 0 &&
      previousTotalPosts === 0 &&
      previousTotalLikes === 0 &&
      previousTotalComments === 0 &&
      previousTotalShares === 0
    ) {
      // No previous data, so insert a new data
      await FacebookData.update(
        {
          total_followers: totalFollowers,
          total_posts: posts.length,
          total_likes: totalLikes,
          total_comments: totalComments,
          total_shares: totalShares,
          growth_followers: 0,
          growth_posts: 0,
          growth_likes: 0,
          growth_comments: 0,
          growth_shares: 0,
        },
        {
          where: { user_id: userId },
        }
      );

      return {
        pageName,
        pagePicture,
        totalFollowers,
        totalPosts: posts.length,
        totalLikes,
        totalComments,
        totalShares,
        growthFollowers: 0,
        growthPosts: 0,
        growthLikes: 0,
        growthComments: 0,
        growthShares: 0,
      };
    } else {
      // Calculate growth
      const growthFollowers = calculateGrowth(
        totalFollowers,
        previousData.total_followers
      );
      const growthPosts = calculateGrowth(
        posts.length,
        previousData.total_posts
      );
      const growthLikes = calculateGrowth(totalLikes, previousData.total_likes);
      const growthComments = calculateGrowth(
        totalComments,
        previousData.total_comments
      );
      const growthShares = calculateGrowth(
        totalShares,
        previousData.total_shares
      );

      // Prepare the data for update
      const updateData = {
        total_followers: totalFollowers,
        total_posts: posts.length,
        total_likes: totalLikes,
        total_comments: totalComments,
        total_shares: totalShares,
        growth_followers:
          growthFollowers !== 0
            ? growthFollowers
            : previousData.growth_followers,
        growth_posts:
          growthPosts !== 0 ? growthPosts : previousData.growth_posts,
        growth_likes:
          growthLikes !== 0 ? growthLikes : previousData.growth_likes,
        growth_comments:
          growthComments !== 0 ? growthComments : previousData.growth_comments,
        growth_shares:
          growthShares !== 0 ? growthShares : previousData.growth_shares,
      };

      // Update the existing row
      await FacebookData.update(updateData, {
        where: { user_id: userId },
      });

      const updatedData = await FacebookData.findOne({
        where: { user_id: userId },
      });

      return {
        pageName,
        pagePicture,
        totalFollowers: updatedData.total_followers,
        totalPosts: updatedData.total_posts,
        totalLikes: updatedData.total_likes,
        totalComments: updatedData.total_comments,
        totalShares: updatedData.total_shares,
        growthFollowers: updatedData.growth_followers,
        growthPosts: updatedData.growth_posts,
        growthLikes: updatedData.growth_likes,
        growthComments: updatedData.growth_comments,
        growthShares: updatedData.growth_shares,
      };
    }
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook data: ${error.message}`);
  }
};

const getGraphsData = async (userId, since, until) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token"],
  });

  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;

  try {
    const graphsData = await axios.get(
      `https://graph.facebook.com/v20.0/${pageId}/insights`,
      {
        params: {
          metric: "page_follows,page_views_total",
          period: "day",
          since: since,
          until: until,
          access_token: pageAccessToken,
        },
      }
    );
    return graphsData.data;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook Graphs data: ${error.message}`);
  }
};

const getFollowersByCountry = async (userId) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token"],
  });

  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;
  try {
    const followersByCountryResponse = await axios.get(
      `https://graph.facebook.com/v20.0/${pageId}/insights`,
      {
        params: {
          metric: "page_fans_country",
          access_token: pageAccessToken,
        },
      }
    );
    const values = followersByCountryResponse.data.data[0].values;
    const secondValue = values[1].value;

    const resultArray = Object.keys(secondValue).map((country) => ({
      country,
      value: secondValue[country],
    }));

    return resultArray;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook Graphs data: ${error.message}`);
  }
};

const formatPostData = (postData) => {
  const insights = postData.insights?.data || [];

  const insightsData = {};
  insights.forEach((insight) => {
    if (insight.values && insight.values.length > 0) {
      if (!insightsData[insight.name]) {
        insightsData[insight.name] = insight.values[0].value;
      }
    }
  });

  return {
    id: postData.id || "",
    message: postData.message || "",
    picture: postData.full_picture || "",
    likes_count: postData.reactions?.summary?.total_count || 0,
    comments_count: postData.comments?.summary?.total_count || 0,
    shares_count: postData.shares?.count || 0,
    Insights: {
      post_reach: insightsData.post_impressions_unique || 0,
      post_clicks: insightsData.post_clicks_unique || 0,
      post_engaged_users: insightsData.post_engaged_users || 0,
      likeCount: insightsData.post_reactions_like_total || 0,
      loveCount: insightsData.post_reactions_love_total || 0,
      wowCount: insightsData.post_reactions_wow_total || 0,
      hahaCount: insightsData.post_reactions_haha_total || 0,
      sorryCount: insightsData.post_reactions_sorry_total || 0,
      angerCount: insightsData.post_reactions_anger_total || 0,
    },
  };
};
const formatReelsData = (reelData) => {
  const insights = reelData.video_insights?.data || [];
  const insightsData = {};
  insights.forEach((insight) => {
    if (insight.values && insight.values.length > 0) {
      if (!insightsData[insight.name]) {
        insightsData[insight.name] = insight.values[0].value;
      }
    }
  });

      // Average Watch Time (Convert from milliseconds to minutes)
      const avgWatchTimeMs = insightsData.post_video_avg_time_watched || 0;
      const avgWatchTimeMin = avgWatchTimeMs / 1000 / 60;

      // View Time (Convert from milliseconds to minutes)
      const viewTimeMs = insightsData.post_video_view_time || 0;
      const viewTimeMin = viewTimeMs / 1000 / 60;

  return {
    id: reelData.id || "",
    message: reelData.description || "",
    picture: reelData.picture || "",
    likes: reelData.likes?.summary?.total_count || 0,
    comments : insightsData.post_video_social_actions?.COMMENT || 0,
    shares : insightsData.post_video_social_actions?.SHARE || 0,
    Insights: {
      reel_reach: insightsData.post_impressions_unique || 0,
      reel_playCount: insightsData.blue_reels_play_count || 0,
      reel_followers_gained: insightsData.post_video_followers || 0,
      avgWatchTimeMin: avgWatchTimeMin,
      viewTimeMin: viewTimeMin,
    },
  };
};

const getFacebookPostsData = async (userId) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token"],
  });

  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;

  try {
    const facebookPostData = await fetchWithPagination(
      `https://graph.facebook.com/v20.0/${pageId}/posts`,
      {
        // fields:
        //   "full_picture,message,reactions.summary(true),comments.summary(true),shares.summary(true),insights.metric(post_impressions_unique, post_clicks_unique, post_engaged_users,post_reactions_like_total,post_reactions_love_total,post_reactions_wow_total, post_reactions_haha_total, post_reactions_sorry_total, post_reactions_anger_total)",
        // access_token: pageAccessToken,
        fields:
          "full_picture,message,reactions.summary(true),comments.summary(true),shares.summary(true),insights.metric(post_impressions_unique,post_clicks,post_reactions_like_total,post_reactions_love_total,post_reactions_wow_total, post_reactions_haha_total, post_reactions_sorry_total, post_reactions_anger_total)",
        access_token: pageAccessToken,
      }
    );

    const formattedPosts = facebookPostData.map((post) => formatPostData(post));
    return formattedPosts;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook Graphs data: ${error.message}`);
  }
};

const getFacebookReelsData = async (userId) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token"],
  });

  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;

  try {
    const facebookReelsData = await fetchWithPagination(
      `https://graph.facebook.com/v20.0/${pageId}/video_reels`,
      {
        fields:
          "id,description,picture,likes.summary(true),comments.summary(true),video_insights",
        access_token: pageAccessToken,
      }
    );
    
    const formattedReels = facebookReelsData.map((reel) => formatReelsData(reel));
    return formattedReels;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook Graphs data: ${error.message}`);
  }
};

const getFacebookSummaryData = async (userId, since, until) => {
  const pageDetails = await FacebookData.findOne({
    where: { user_id: userId },
    attributes: ["page_id", "page_access_token"],
  });

  const pageId = pageDetails.page_id;
  const pageAccessToken = pageDetails.page_access_token;

  try {
    const pageLikes = await axios.get(
      `https://graph.facebook.com/v20.0/${pageId}/insights`,
      {
        params: {
          metric: "page_fans,page_impressions_unique,page_post_engagements,page_consumptions_unique",
          period: "day",
          since: since,
          until: until,
          access_token: pageAccessToken,
        },
      }
    );
    return pageLikes.data;
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw new Error(`Error fetching Facebook Graphs data: ${error.message}`);
  }
}

export {
  getFacebookOverviewData,
  getGraphsData,
  getFollowersByCountry,
  getFacebookPostsData,
  getFacebookReelsData,
  getFacebookSummaryData
};
