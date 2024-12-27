import asyncHandler from "express-async-handler";
import { UserRegistrationSmap } from "../Model/userModel.js";
import {
  getFacebookOverviewData,
  getFacebookPostsData,
  getFacebookReelsData,
  getFacebookSummaryData,
  getFollowersByCountry,
  getGraphsData,
} from "./Stratergies/facebookStratergy.js";
import moment from "moment";
import { validateToken } from "../Utils/accessTokenUtils.js";
import { FacebookData } from "../Model/FacebookData.js";
import { dbModal, shiftData } from "../Utils/commonUtils.js";

const getUserDetails = asyncHandler(async (req, res) => {
  const { email, user_id } = req.token;
  if (!email || !user_id) {
    res.status(401).send("User not Found");
  }
  try {
    const userDetails = await UserRegistrationSmap.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    let facebookDetails;
    if (userDetails.facebook) {
      facebookDetails = await FacebookData.findOne({
        where: {
          user_id: userDetails.user_id,
        },
        attributes: ["username", "user_picture"],
      });
    }
    res.status(200).json({ userDetails, facebookDetails });
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
});

const socialMediaConnection = asyncHandler(async (req, res) => {
  const provider = req.body.provider;
  const status = req.body.status;
  const { user_id, email } = req.token;
  const Modal = dbModal[provider];
  if (status === "connect") {
    const validation = await validateToken(req);
    if (validation === false) {
      return res.status(400).json({ error: "Invalid Token/Provider" });
    }
    const [updatedRows, updated] = await UserRegistrationSmap.update(
      { [provider]: req.body.access_token },
      { where: { user_id } }
    );
    const userDetails = await UserRegistrationSmap.findOne({
      where: { user_id },
      attributes: { exclude: ["password"] },
    });

    const user_profile = req.user.picture.data.url;
    const [facebook, facebookCreated] = await Modal.findOrCreate({
      where: { user_id },
      defaults: {
        user_id: user_id,
        username: req.user.name,
        user_picture: user_profile,
        page_id: req.body.page_id,
        page_access_token: req.body.page_access_token,
        category_list: req.page.category_list,
        page_name: req.page.name,
        page_picture: req.page.picture.data.url,
      },
    });
    res.status(200).json({ userDetails, facebook });
  } else if (status === "disconnect") {
    const [updatedRows, updated] = await UserRegistrationSmap.update(
      { [provider]: null },
      { where: { user_id } }
    );
    const userDetails = await UserRegistrationSmap.findOne({
      where: { user_id },
      attributes: { exclude: ["password"] },
    });

    await Modal.destroy({
      where: { user_id },
    });
    res.status(200).json({ userDetails });
  }
});

const dashboardOverviewData = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;
  const filter = req.query.filter;
  const user = await UserRegistrationSmap.findByPk(user_id);
  if (!user) {
    return res.status(404).send("User not Found");
  }
  if (!user[filter]) {
    return res.status(400).send("Provider not Connected");
  }
  switch (filter) {
    case "facebook":
      const facebookData = await getFacebookOverviewData(user_id);
      res.json(facebookData);
      break;

    default:
      res.status(400).send("Invalid Provider");
      break;
  }
});

const facebookFollowersAndVisitsGraphsData = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;
  const endDate = moment();
  const startDate = moment().subtract(3, "month");
  const since = startDate.format("DD-MM-YYYY");
  const until = endDate.format("DD-MM-YYYY");

  const graphsData = await getGraphsData(user_id, since, until);
  const followersDataWithoutShited = await graphsData.data[0].values;
  const pageVisitsDataWithoutShited = await graphsData.data[1].values;

  const followersData = shiftData(followersDataWithoutShited);
  const pageVisitsData = shiftData(pageVisitsDataWithoutShited);

  res.json({ followersData, pageVisitsData });
});

const followersByCountry = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;

  const followersByCountryData = await getFollowersByCountry(user_id);
  res.json(followersByCountryData)
})

const facebookPostsData = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;
  const facebookPosts = await getFacebookPostsData(user_id);
  res.json(facebookPosts);
})

const facebookReelsData = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;
  const facebookReels = await getFacebookReelsData(user_id);
  res.json(facebookReels);
})

const facebookSummaryData = asyncHandler(async (req, res) => {
  const user_id = req.token.user_id;
  const endDate = moment();
  const startDate = moment().subtract(3, "month");
  const since = startDate.format("DD-MM-YYYY");
  const until = endDate.format("DD-MM-YYYY");
  const facebookSummaryDataWithoutShifted = await getFacebookSummaryData(user_id, since, until);
  const facebookPageLikes = await shiftData(facebookSummaryDataWithoutShifted.data[0].values);
  const facebookPageReach = await shiftData(facebookSummaryDataWithoutShifted.data[1].values);
  const facebookPageEngagement = await shiftData(facebookSummaryDataWithoutShifted.data[2].values);
  const facebookPageConsumption = await shiftData(facebookSummaryDataWithoutShifted.data[3].values);
  res.json({facebookPageLikes:facebookPageLikes, facebookPageReach:facebookPageReach,facebookPageEngagement:facebookPageEngagement,facebookPageConsumption:facebookPageConsumption});
})

export {
  getUserDetails,
  dashboardOverviewData,
  facebookFollowersAndVisitsGraphsData,
  socialMediaConnection,
  followersByCountry,
  facebookPostsData,
  facebookReelsData,
  facebookSummaryData
};
