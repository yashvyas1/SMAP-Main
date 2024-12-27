import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { BsFillFileTextFill } from "react-icons/bs";
import {
  FaComments,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegFileAlt,
  FaUserFriends,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { RiGalleryView2 } from "react-icons/ri";

export const platformData = [
  {
    platform: "View All",
    icon: <RiGalleryView2 className="h-6 w-6 text-[#1877F2]" />,
    label: "View All",
  },
  {
    platform: "Facebook",
    icon: <FaFacebook className="h-6 w-6 text-[#1877F2]" />,
    label: "Facebook",
  },
  {
    platform: "Twitter",
    icon: <FaXTwitter className="h-6 w-6 text-[#120143]" />,
    label: "Twitter",
  },
  {
    platform: "YouTube",
    icon: <FaYoutube className="h-6 w-6 text-[#b50000]" />,
    label: "YouTube",
  },
  {
    platform: "Instagram",
    icon: <FaInstagram className="h-6 w-6 text-[#C13584]" />,
    label: "Instagram",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin className="h-6 w-6 text-[#0077B5]" />,
    label: "LinkedIn",
  },
];

export const cardData = [
  {
    platform: "Instagram",
    icon: <FaInstagram className="h-6 w-6 text-[#C13584]" />,
    username: "Shivani",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPsmQ6i5_QRmOY5TkIBE7cf8IblOVA1WEzQ&s",
    type: "Scheduled",
  },
  {
    platform: "Facebook",
    icon: <FaFacebook className="h-6 w-6 text-[#1877F2]" />,
    username: "Shivani",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://akm-img-a-in.tosshub.com/sites/visualstory/wp/2024/02/the-rock-wrestlemania-5_1200_675.jpg",
    type: "Published",
  },
  {
    platform: "YouTube",
    icon: <FaYoutube className="h-6 w-6 text-[#b50000]" />,
    username: "Shivani",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9BdP73hbk6DAqSAmukktPn2dhvx-9XjCJQ&s",
    type: "Cancelled",
  },
  {
    platform: "Twitter",
    icon: <FaXTwitter className="h-6 w-6 text-[#120143]" />,
    username: "Prasenjeet",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://w0.peakpx.com/wallpaper/881/553/HD-wallpaper-best-horror-ghost-with-sword-sword-danger.jpg",
    type: "Scheduled",
  },
  {
    platform: "Instagram",
    icon: <FaInstagram className="h-6 w-6 text-[#C13584]" />,
    username: "Prasenjeet",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQeLUdRpJ4apOM1mIqvS3C6r8gg1ywqesYw&s",
    type: "Cancelled",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin className="h-6 w-6 text-[#0077B5]" />,
    username: "Shivani",
    message:
      "It’s not just yoga—it’s a whole lifestyle. Subscribe today for exclusive yoga classes, photoshoots, and a lot of fun!",
    date: "Jan 04, 2024",
    time: "10:00 AM",
    imageUrl:
      "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/taylor-swift-chromebook-wallpaper.jpg",
    type: "Published",
  },
];

export const socialMediaData = [
  {
    platform: "Facebook",
    icon: <FaFacebook className="h-8 w-8 text-[#1877F2]" />,
    label: "Facebook",
    status: "Connected",
  },
  {
    platform: "Twitter",
    icon: <FaXTwitter className="h-8 w-8 text-[#120143]" />,
    label: "Twitter",
    status: "Connected",
  },
  {
    platform: "YouTube",
    icon: <FaYoutube className="h-8 w-8 text-[#b50000]" />,
    label: "YouTube",
    status: "Connected",
  },
  {
    platform: "Instagram",
    icon: <FaInstagram className="h-8 w-8 text-[#C13584]" />,
    label: "Instagram",
    status: "Connected",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin className="h-8 w-8 text-[#0077B5]" />,
    label: "LinkedIn",
    status: "Connected",
  },
];

export const socialMediaStatistics = [
  {
    title: "Total Followers",
    icon: <BiGroup className="h-10 w-10 text-[#01A9FC]" />,
    count: "13,500",
    percentage: "24",
  },
  {
    title: "Total Posts",
    icon: <FaRegFileAlt className="h-8 w-8 text-[#01A9FC]" />,
    count: "76,800",
    percentage: "124",
  },
  {
    title: "Total Likes",
    icon: <AiFillLike className="h-8 w-8 text-[#01A9FC]" />,
    count: "36,500",
    percentage: "-63",
  },
  {
    title: "Total Comments",
    icon: <FaComments className="h-8 w-8 text-[#01A9FC]" />,
    count: "22,300",
    percentage: "-32",
  },
  {
    title: "Total Shares",
    icon: <HiOutlinePaperAirplane className="h-8 w-8 text-[#01A9FC]" />,
    count: "48,600",
    percentage: "89",
  },
];

export const sampleMessages = [
  {
    id: 1,
    name: "Virat Kohli",
    avatar:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.png",
    message:
      "Excited for the upcoming series! Looking forward to the new challenges.",
    time: "10:30 AM",
    messages: [
      {
        sender: "user",
        message: "Hi! Can't wait for the match.",
        time: "10:31 AM",
      },
      {
        sender: "other",
        message: "Me too! It's going to be great.",
        time: "10:32 AM",
      },
    ],
    username: "virat.kohli",
    type: "unread",
    attachments: [{ type: "image", url: "https://example.com/image1.jpg" }],
  },
  {
    id: 2,
    name: "Smriti Mandhana",
    avatar:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/320600/320632.png",
    message:
      "Preparing for the grand slam. It's been intense training sessions.",
    time: "1:45 PM",
    messages: [
      {
        sender: "user",
        message: "How's the preparation going?",
        time: "1:46 PM",
      },
      {
        sender: "other",
        message: "Very intense but exciting.",
        time: "1:47 PM",
      },
    ],
    username: "smriti.mandhana",
    type: "all",
    attachments: [],
  },
  {
    id: 3,
    name: "Honey Singh",
    avatar:
      "https://static.india.com/wp-content/uploads/2023/02/Honey-Singh-2.jpg",
    message: "New album dropping soon. Stay tuned for some fire tracks!",
    time: "3:20 PM",
    messages: [
      {
        sender: "user",
        message: "Can't wait for the new tracks!",
        time: "3:21 PM",
      },
      { sender: "other", message: "It's going to be lit!", time: "3:22 PM" },
    ],
    username: "honey.singh",
    type: "unread",
    attachments: [{ type: "audio", url: "https://example.com/track.mp3" }],
  },
  {
    id: 4,
    name: "Robert Downey Jr.",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQO3Qjci7RAMZsT6FdrJ1TwLmxtj0ImUbVCQ&s",
    message: "I am Iron Man... That up there? That’s the endgame.",
    time: "5:10 PM",
    messages: [
      { sender: "user", message: "Great quote! What's new?", time: "5:11 PM" },
      {
        sender: "other",
        message: "Just finishing up a new project.",
        time: "5:12 PM",
      },
    ],
    username: "robert.downey",
    type: "all",
    attachments: [],
  },
  {
    id: 5,
    name: "Emma Watson",
    avatar:
      "https://m.media-amazon.com/images/M/MV5BYjI4NWU0NzYtMjdmOS00MTcxLTliOTMtN2QxYTc4ZmNjZmY5XkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_.jpg",
    message:
      "Working on a new environmental project. Excited to make a difference.",
    time: "7:25 PM",
    messages: [
      {
        sender: "user",
        message: "That's awesome! What are you working on?",
        time: "7:26 PM",
      },
      {
        sender: "other",
        message: "It's a new initiative for conservation.",
        time: "7:27 PM",
      },
    ],
    username: "emma.watson",
    type: "all",
    attachments: [{ type: "document", url: "https://example.com/project.pdf" }],
  },
  {
    id: 6,
    name: "Lionel Messi",
    avatar:
      "https://a.espncdn.com/combiner/i?img=/i/headshots/soccer/players/full/45843.png&w=350&h=254",
    message:
      "Training hard for the next match. The team is putting in the work.",
    time: "8:00 PM",
    messages: [
      { sender: "user", message: "How's the training going?", time: "8:01 PM" },
      { sender: "other", message: "Intense but promising.", time: "8:02 PM" },
    ],
    username: "lionel.messi",
    type: "unread",
    attachments: [],
  },
  {
    id: 7,
    name: "Lana Del Rey",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToG2wHz9vk4SNR9E1aQnekzf3e2JN952AZbQ&s",
    message:
      "Can't wait for the next tour! It’s going to be an unforgettable experience.",
    time: "9:15 PM",
    messages: [
      { sender: "user", message: "Looking forward to it!", time: "9:16 PM" },
      {
        sender: "other",
        message: "It's going to be amazing.",
        time: "9:17 PM",
      },
    ],
    username: "lana.del.rey",
    type: "all",
    attachments: [],
  },
  {
    id: 8,
    name: "Cristiano Ronaldo",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTv2myz1Q_FlacMfrujifqrVsH7FuETKgdhQ&s",
    message: "Feeling strong and ready to compete in the upcoming matches.",
    time: "10:45 PM",
    messages: [
      {
        sender: "user",
        message: "Good luck with the matches!",
        time: "10:46 PM",
      },
      {
        sender: "other",
        message: "Thanks! We’re working hard.",
        time: "10:47 PM",
      },
    ],
    username: "cristiano.ronaldo",
    type: "all",
    attachments: [],
  },
  {
    id: 9,
    name: "Elon Musk",
    avatar:
      "https://c.ndtvimg.com/2024-04/a945hc54_elon-musk_625x300_24_April_24.jpeg",
    message:
      "Launching new SpaceX mission next week. Excited for the next steps in space exploration!",
    time: "11:00 PM",
    messages: [
      {
        sender: "user",
        message: "That’s incredible! What’s the mission about?",
        time: "11:01 PM",
      },
      {
        sender: "other",
        message: "It's a new venture into deep space.",
        time: "11:02 PM",
      },
    ],
    username: "elon.musk",
    type: "unread",
    attachments: [],
  },
  {
    id: 10,
    name: "Narendra Modi",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNouSYF7SGHOcJxxOF7XyyMbzyNWD5abuwjQ&s",
    message: "Focusing on economic reforms to boost growth and development.",
    time: "12:00 AM",
    messages: [
      {
        sender: "user",
        message: "What reforms are being focused on?",
        time: "12:01 AM",
      },
      {
        sender: "other",
        message: "Enhancing infrastructure and policies.",
        time: "12:02 AM",
      },
    ],
    username: "narendra.modi",
    type: "all",
    attachments: [],
  },
];

// Data of User's Youtube Videos
export const sampleYoutubeData = [
  {
    videoId: "P4AP6GXllCc",
    title: "Maheshmati Shamrajya  #shorts",
    postType: "shorts",
    description: "",
    publishedAt: "2024-08-20T06:18:24Z",
    thumbnailUrl: "https://i.ytimg.com/vi/P4AP6GXllCc/sddefault.jpg",
    statistics: {
      viewCount: "100",
      likeCount: "150",
      dislikeCount: "200",
      favoriteCount: "130",
      commentCount: "120",
    },
  },
  {
    videoId: "7JvSvTcUCNY",
    title: "2119 155244112 small",
    postType: "video",
    description: "",
    publishedAt: "2024-08-20T06:15:41Z",
    thumbnailUrl: "https://i.ytimg.com/vi/7JvSvTcUCNY/sddefault.jpg",
    statistics: {
      viewCount: "80",
      likeCount: "70",
      dislikeCount: "60",
      favoriteCount: "90",
      commentCount: "70",
    },
  },
  {
    videoId: "RZZtjuNv350",
    title: "New Video",
    postType: "video",
    description: "",
    publishedAt: "2024-08-28T06:13:53Z",
    thumbnailUrl: "https://i.ytimg.com/vi/RZZtjuNv350/sddefault.jpg",
    statistics: {
      viewCount: "30",
      likeCount: "20",
      dislikeCount: "60",
      favoriteCount: "50",
      commentCount: "60",
    },
  },
  {
    videoId: "HeXdCB1j4Lk",
    title: "Monkey Man",
    postType: "shorts",
    description: "",
    publishedAt: "2024-08-15T05:47:22Z",
    thumbnailUrl: "https://i.ytimg.com/vi/HeXdCB1j4Lk/sddefault.jpg",
    statistics: {
      viewCount: "81",
      likeCount: "50",
      dislikeCount: "20",
      favoriteCount: "90",
      commentCount: "20",
    },
  },
  {
    videoId: "IA0Mon-Qsxg",
    title: "Chal Chaiya Chaiya Song",
    postType: "video",
    description: '"ENJOY THE CHAIYA CHAIYA"',
    publishedAt: "2024-08-12T05:32:15Z",
    thumbnailUrl: "https://i.ytimg.com/vi/IA0Mon-Qsxg/sddefault.jpg",
    statistics: {
      viewCount: "92",
      likeCount: "81",
      dislikeCount: "70",
      favoriteCount: "20",
      commentCount: "70",
    },
  },
];

// Data of engagement on Youtube channel
export const audienceData = [
  {
    Date: "2024-07-22",
    views: 15,
    estimatedMinutesWatched: 45,
    averageViewDuration: 180,
    averageViewPercentage: 60,
    subscribersGained: 1,
    subscribersLost: 3,
    shares: 1,
    comments: 2,
    likes: 3,
    cardTeaserImpressions: 10,
    dislikes: 6,
  },
  {
    Date: "2024-07-23",
    views: 20,
    estimatedMinutesWatched: 70,
    averageViewDuration: 210,
    averageViewPercentage: 70,
    subscribersGained: 2,
    subscribersLost: 1,
    shares: 2,
    comments: 1,
    likes: 4,
    cardTeaserImpressions: 15,
    dislikes: 1,
  },
  {
    Date: "2024-07-30",
    views: 10,
    estimatedMinutesWatched: 30,
    averageViewDuration: 180,
    averageViewPercentage: 60,
    subscribersGained: 1,
    subscribersLost: 4,
    shares: 2,
    comments: 4,
    likes: 2,
    cardTeaserImpressions: 8,
    dislikes: 3,
  },
  {
    Date: "2024-08-10",
    views: 25,
    estimatedMinutesWatched: 100,
    averageViewDuration: 240,
    averageViewPercentage: 80,
    subscribersGained: 3,
    subscribersLost: 1,
    shares: 3,
    comments: 4,
    likes: 5,
    cardTeaserImpressions: 20,
    dislikes: 3,
  },
];

// User's Facebook Profile Data
export const facebookProfileData = {
  email: "amankurmi777@gmail.com",
  gender: "male",
  birthday: "03/15/1996",
  age: 28,
  totalFriends: 268,
  totalPosts: 60,
  totalReactions: 1876,
  totalComments: 147,
  totalShares: 11,
  profilePicture:
    "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2721794817984061&height=50&width=50&ext=1726383178&hash=AbarK6dDm0c0iP8rZ6tZljhs",
};

// facebook user's all post data
export const facebookAllPost = [
  {
    postId: "2721794817984061_2022732571223626",
    description: "Smile, it's free therapy",
    publishedAt: "2021-12-04T08:02:14+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t39.30808-6/264079253_2022732591223624_910560191831950450_n.jpg?stp=dst-jpg_p720x720&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=28rtVOVyeyoQ7kNvgEE05GC&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYATI582_lIOzu351__r88Dn4wPS5wTQVKUA9PE6hZQXDw&oe=66C4E550",
    statistics: {
      likeCount: 58,
      commentCount: 36,
      shareCount: 41,
    },
  },
  {
    postId: "2721794817984061_1845153095648242",
    description: "소메ㅌ힝 인시데 ㅁㅔ 잇 미씽",
    publishedAt: "2021-04-12T21:47:17+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/172965595_1845153062314912_3905765193067654940_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3lDsJXB3NNIQ7kNvgEktZ7_&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCO8_fCtZyM1lniht5UnbQhP5g6q3gTG2B4HSxWLgq4SA&oe=66E6AA7F",
    statistics: {
      likeCount: 36,
      commentCount: 53,
      shareCount: 60,
    },
  },
  {
    postId: "2721794817984061_1796280287202190",
    description: "",
    publishedAt: "2021-02-04T06:43:59+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/146345319_1796280290535523_4465592729711999081_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=JbImKVIG3x0Q7kNvgH10NNb&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCTijvFGwEYZBtY9zNKQsprAgeiZQpauPnQmWmyCtm0fg&oe=66E69A00",
    statistics: {
      likeCount: 80,
      commentCount: 11,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1598394076990813",
    description:
      "On public demand, but for last time, to ab or kuch suggest mt krna bhai",
    publishedAt: "2020-06-14T13:40:22+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.13418-10/103861530_587500895230099_4661913779246031939_n.jpg?stp=dst-jpg_s720x720&_nc_cat=104&ccb=1-7&_nc_sid=ace027&_nc_ohc=o1DIjuJZDwsQ7kNvgF8WucT&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBzkJK3AeU-j27fi4gI72-EqjLESovglRfCnV65GhrF7g&oe=66C5154D",
    statistics: {
      likeCount: 52,
      commentCount: 48,
      shareCount: 50,
    },
  },
  {
    postId: "2721794817984061_1593139657516255",
    description: "What's on my mind??",
    publishedAt: "2020-06-08T09:15:59+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/103067722_1593139614182926_2190511705314835419_n.jpg?stp=dst-jpg_p720x720&_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=cEzsfhk4OaoQ7kNvgF1rJ4b&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCFOu9Oo6wTqA3vWRosW-Kj38w0E5UOqT7DqwQ1s7Bhpw&oe=66E6AA36",
    statistics: {
      likeCount: 71,
      commentCount: 79,
      shareCount: 60,
    },
  },
  {
    postId: "2721794817984061_1574383742725180",
    description: "",
    publishedAt: "2020-05-17T16:59:38+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.13418-10/97551910_3168743056511754_7404533101591789568_n.jpg?stp=dst-jpg_p720x720&_nc_cat=109&ccb=1-7&_nc_sid=ace027&_nc_ohc=gTo95MVB0sIQ7kNvgGv7MM6&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBp-l7lwA3RXe6XCsL8cJslR3sa3eHJ0WKx3M0Oo5L04Q&oe=66C4FA25",
    statistics: {
      likeCount: 19,
      commentCount: 50,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1570598503103704",
    description:
      "A collaboration with my friend Bhoopendra Mishra, thanks for taking me on your project.Enjoy the video😎",
    publishedAt: "2020-05-13T05:42:03+0000",
    contentType: "video",
    postURL:
      "https://external.fpnq15-1.fna.fbcdn.net/emg1/v/t13/11947971112408920050?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FD1nqEF2kTcg%2Fmaxresdefault.jpg&fb_obo=1&utld=ytimg.com&stp=c280.0.720.720a_dst-emg0_q75_s720x720&ccb=13-1&oh=06_Q399bVTugTUvHQA2TGZOxTUjA-YXrUj1o-b15FqJ59lcJ1Y&oe=66C11274&_nc_sid=632586",
    statistics: {
      likeCount: 26,
      commentCount: 7,
      shareCount: 2,
    },
  },
  {
    postId: "2721794817984061_1570137493149805",
    description: "",
    publishedAt: "2020-05-12T16:22:42+0000",
    contentType: "text",
    postURL: "",
    statistics: {
      likeCount: 21,
      commentCount: 3,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1564794213684133",
    description: "Thankyou so much FNS😊😍",
    publishedAt: "2020-05-06T13:40:05+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/96533947_658581404724363_1421808043842076672_n.jpg?stp=dst-jpg_p720x720&_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=GAOGO8EspHQQ7kNvgGwYpVp&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCQigNg55kYPlQPWfXAQ7F_KVA9fDVCfiOjbTVfoOEWMw&oe=66E67EB9",
    statistics: {
      likeCount: 48,
      commentCount: 10,
      shareCount: 20,
    },
  },
  {
    postId: "2721794817984061_1564153180414903",
    description: "Really....😍",
    publishedAt: "2020-05-05T18:54:15+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/95743123_658035484778955_2039710733721141248_n.jpg?stp=dst-jpg_p720x720&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=Gw_HgiBFhicQ7kNvgH8Z_ML&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYA2gqQCZbjWj8hiY1a5HgA2rZV38mlJ5UnQww8zgXdSkg&oe=66E69A6F",
    statistics: {
      likeCount: 14,
      commentCount: 10,
      shareCount: 10,
    },
  },
  {
    postId: "2721794817984061_1533268946836660",
    description: "",
    publishedAt: "2020-03-31T08:54:31+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/91839102_1533268953503326_967246026836541440_n.jpg?stp=dst-jpg_p720x720&_nc_cat=105&ccb=1-7&_nc_sid=53a332&_nc_ohc=mDD3hXwEGAAQ7kNvgGblrAw&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBQccGMDCUboGzbjEXGTQpObFRsj8NMpFj1tnQNZE0vZQ&oe=66E69E50",
    statistics: {
      likeCount: 68,
      commentCount: 4,
      shareCount: 20,
    },
  },
  {
    postId: "2721794817984061_1524462347717320",
    description: "",
    publishedAt: "2020-03-21T17:18:30+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 28,
      commentCount: 11,
      shareCount: 14,
    },
  },
  {
    postId: "2721794817984061_1518965441600344",
    description: "",
    publishedAt: "2020-03-15T17:46:55+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/82417125_217676359603522_6901755008627245056_n.jpg?stp=dst-jpg_s720x720&_nc_cat=107&ccb=1-7&_nc_sid=282d23&_nc_ohc=XSslaSjTyLgQ7kNvgHcYB0Q&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYD8ldzkWi7zFa8aWYNqYKBHNuQJKHRKvbG3M2mFdLp5hg&oe=66C5151D",
    statistics: {
      likeCount: 39,
      commentCount: 5,
      shareCount: 40,
    },
  },
  {
    postId: "2721794817984061_1514582035372018",
    description: "",
    publishedAt: "2020-03-10T09:16:35+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/89389824_1514581825372039_9069695439829204992_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=aZohmVmUj6wQ7kNvgGoKKCw&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCQkiRhJ4oHbnSdoju7kzNM0XBr0tnU71Df9p-XIwc7XA&oe=66E6A61D",
    statistics: {
      likeCount: 67,
      commentCount: 8,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1513238618839693",
    description: "Dj night",
    publishedAt: "2020-03-08T15:42:16+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/88363958_1513238598839695_8016538882977824768_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=b711Jx-AAo8Q7kNvgEHfMbH&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYClLnvloBjA2g1lOlx7r7LUfhh0PKAesZ6-On6k2OWd2g&oe=66E6AD86",
    statistics: {
      likeCount: 52,
      commentCount: 1,
      shareCount: 20,
    },
  },
  {
    postId: "2721794817984061_1512026315627590",
    description: "https://youtu.be/Cdk2Zufeizg",
    publishedAt: "2020-03-07T04:36:10+0000",
    contentType: "video",
    postURL:
      "https://external.fpnq15-1.fna.fbcdn.net/emg1/v/t13/9270605501598095872?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCdk2Zufeizg%2Fmaxresdefault.jpg&fb_obo=1&utld=ytimg.com&stp=c0.5000x0.5000f_dst-emg0_p720x720_q75&ccb=13-1&oh=06_Q399iBfq0rUVQWyV3d4z13fMfPvye3T96O_FB8hlU2i6SXk&oe=66C11CEE&_nc_sid=ef6713",
    statistics: {
      likeCount: 27,
      commentCount: 10,
      shareCount: 3,
    },
  },
  {
    postId: "2721794817984061_1510691399094415",
    description: "",
    publishedAt: "2020-03-05T13:19:12+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/75364779_869280893496376_5568812028572729344_n.jpg?stp=dst-jpg_s720x720&_nc_cat=100&ccb=1-7&_nc_sid=282d23&_nc_ohc=mnkmTDsJHfUQ7kNvgFhgiNf&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBTiXqOUNrJd3H-syzf0sZPawqhSC8cxw-QZ83afyjZOQ&oe=66C4F564",
    statistics: {
      likeCount: 17,
      commentCount: 40,
      shareCount: 1,
    },
  },
  {
    postId: "2721794817984061_1503400063156882",
    description: "",
    publishedAt: "2020-02-25T13:35:33+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/83899716_625079581606053_7421509930491838464_n.jpg?stp=dst-jpg_s720x720&_nc_cat=109&ccb=1-7&_nc_sid=282d23&_nc_ohc=Q8ee3nktYc8Q7kNvgGo6Ymf&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBKfFopXA129JxJI8h4VlEe24CI3dQtANCHuaGRE33Mdw&oe=66C503DD",
    statistics: {
      likeCount: 20,
      commentCount: 2,
      shareCount: 40,
    },
  },
  {
    postId: "2721794817984061_1496734533823435",
    description: "",
    publishedAt: "2020-02-17T13:21:43+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/83025794_170986147657472_8419265871695839232_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=282d23&_nc_ohc=Zgq4A3oZGPYQ7kNvgELWcVw&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYAy-3RTT_KPgtKXwcQRecF3DAFY_HZzIDsYwMr80xoABA&oe=66C4FDE7",
    statistics: {
      likeCount: 50,
      commentCount: 14,
      shareCount: 41,
    },
  },
  {
    postId: "2721794817984061_1491000044396884",
    description: "Valentine's week advice",
    publishedAt: "2020-02-10T13:23:01+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/81821597_1491000294396859_3035421699261595648_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=282d23&_nc_ohc=qnUdK5PmoFUQ7kNvgH8cZfh&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBpS07EzW1CMjpUa2vY5fbP3LNB5JCACW0snsY1bHvPJw&oe=66C51322",
    statistics: {
      likeCount: 19,
      commentCount: 40,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1407920082704881",
    description:
      "For those who r asking for link after watching my story\nThis is my new video\n",
    publishedAt: "2019-11-15T09:26:25+0000",
    contentType: "video",
    postURL:
      "https://external.fpnq15-1.fna.fbcdn.net/emg1/v/t13/4549826583523504732?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FxEWJS1_9N28%2Fmaxresdefault.jpg&fb_obo=1&utld=ytimg.com&stp=c0.5000x0.5000f_dst-emg0_p720x720_q75&ccb=13-1&oh=06_Q399h06WCKApkStdGCI_Xli1-3NTBSiCkKqZcYQo-aX8DWQ&oe=66C0F671&_nc_sid=ef6713",
    statistics: {
      likeCount: 23,
      commentCount: 20,
      shareCount: 30,
    },
  },
  {
    postId: "2721794817984061_1242689299227961",
    description: "",
    publishedAt: "2019-04-20T07:02:36+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/57032324_1242689522561272_4970894908148678656_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=282d23&_nc_ohc=oPmfu1nzHwMQ7kNvgGbdyyH&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBV0BmLXAvukM5JlFPv9tcNm1Px-6bixD0DNBn1y0jlPg&oe=66C5042F",
    statistics: {
      likeCount: 15,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1201878623309029",
    description: "",
    publishedAt: "2019-02-15T07:22:31+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/52446317_1201878606642364_8756737008514105344_n.jpg?stp=dst-jpg_p720x720&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=J7aL8WmrzbUQ7kNvgEVbLGt&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCFhD7k6NT33sg9Y82w-hlhnlPDygHGh6ZqrAeDWN2FMQ&oe=66E6A5D0",
    statistics: {
      likeCount: 53,
      commentCount: 2,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1194792350684323",
    description: "",
    publishedAt: "2019-02-04T17:48:41+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/51964874_1194809130682645_8329661485122846720_n.jpg?stp=dst-jpg_s720x720&_nc_cat=104&ccb=1-7&_nc_sid=282d23&_nc_ohc=UhJyvQb7j4MQ7kNvgGKKtHh&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYA2KiSvV-AU5U22IsmI1bUnwvcGExFHl73YxFF8MrC_cg&oe=66C50E5B",
    statistics: {
      likeCount: 20,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1180765052087053",
    description: "",
    publishedAt: "2019-01-14T19:01:38+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/49949278_1180765055420386_7191580909294845952_n.jpg?stp=dst-jpg_p720x720&_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_ohc=6tToGXr6nm8Q7kNvgH-IuzV&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDQO_qfRB5gqTmv7AUkgxgIzDthvo-VB6K9iRSO7DUVvg&oe=66E6A06C",
    statistics: {
      likeCount: 84,
      commentCount: 4,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1143727112457514",
    description: "#Marble_city_Jabalpur",
    publishedAt: "2018-11-20T08:10:58+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/44448207_1143727235790835_3304360323565223936_n.jpg?stp=dst-jpg_s720x720&_nc_cat=111&ccb=1-7&_nc_sid=282d23&_nc_ohc=FkA7V3I45igQ7kNvgE6z83g&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYB9MwJDFfUTifWwW1FTbgQb7897r2f0CkDiJYokU3xitw&oe=66C4FB15",
    statistics: {
      likeCount: 23,
      commentCount: 2,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1121037511393141",
    description: "",
    publishedAt: "2018-10-15T16:50:16+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/44045274_1121037478059811_986482798808268800_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=m34CfkcXfZUQ7kNvgHhZh5F&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDPuOJRYI5i6VFEnMgw4Hd5H390qLhcAVVllgk-cv-wGg&oe=66E69620",
    statistics: {
      likeCount: 52,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1117957905034435",
    description: "#Pana_tumko_mumkin_hi_nahi",
    publishedAt: "2018-10-10T12:21:24+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/41173593_1117958221701070_4917059400058798080_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=282d23&_nc_ohc=HjJmw-YzOqsQ7kNvgGUHxnL&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYD9Go_c-EitMDtaVgpWZlRrJs1B5FexyBYTswS30QpLsA&oe=66C4F913",
    statistics: {
      likeCount: 52,
      commentCount: 3,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1108253636004862",
    description: "",
    publishedAt: "2018-09-24T14:53:42+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/38983868_1108253862671506_431857411129606144_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=282d23&_nc_ohc=4wYZw7R2UQgQ7kNvgF1ZPZO&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYC9VBTFrbFWHnm0sdfidrYP0U2vnrjQauQ9fikemLBF7g&oe=66C4F22C",
    statistics: {
      likeCount: 17,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1101796179983941",
    description: "#Golmaal",
    publishedAt: "2018-09-13T12:54:37+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/38948096_1101796319983927_2540298243040870400_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=282d23&_nc_ohc=GxVWVKerEmMQ7kNvgGGIJBd&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBUQZUdIEcS0c5U8krx9nz882eTXKU0dcDkydtmRmVolw&oe=66C4E522",
    statistics: {
      likeCount: 17,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1098085513688341",
    description: "",
    publishedAt: "2018-09-07T01:39:10+0000",
    contentType: "link",
    postURL:
      "https://external.fpnq15-1.fna.fbcdn.net/emg1/v/t13/7699886295132735998?url=https%3A%2F%2Fstatic.moonactive.net%2Fopen_graph%2FCoinMaster%2FCards%2Fstatues_7.jpg%3Fref%3DCardsShare%26v%3D12&fb_obo=1&utld=moonactive.net&stp=c0.5000x0.5000f_dst-emg0_p300x300_q75&ccb=13-1&oh=06_Q399z5PEjCm3K0o3lUWHCh2ocLeSwPh-XmG_bqV0CiYSBjU&oe=66C101BD&_nc_sid=ef6713",
    statistics: {
      likeCount: 1,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1095798900583669",
    description: "",
    publishedAt: "2018-09-03T12:33:15+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/24582248_1482192288582108_3828760699237040128_n.jpg?stp=dst-jpg_s720x720&_nc_cat=103&ccb=1-7&_nc_sid=282d23&_nc_ohc=_ws0N7tzhr8Q7kNvgEIma7L&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYA9oZfHw7AomY73bLTZjHlWfsRV2LchKtLp2wka70l_rQ&oe=66C4FEB5",
    statistics: {
      likeCount: 1,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1037154986448061",
    description: "",
    publishedAt: "2018-07-09T07:06:01+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/36900453_1037154959781397_1002648819487211520_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=8uxgfrc5drYQ7kNvgEubsja&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCgI1yaznIcLRrtbrmHJU-4iG9p9N6DLhUDg2EXO_QHnw&oe=66E692F2",
    statistics: {
      likeCount: 93,
      commentCount: 5,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1035332616630298",
    description: "#Zingaat_song",
    publishedAt: "2018-07-07T14:34:29+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/35681476_1035335973296629_4014768461447168000_n.jpg?stp=dst-jpg_s720x720&_nc_cat=109&ccb=1-7&_nc_sid=282d23&_nc_ohc=dL7sz0QNuXcQ7kNvgEKpXSj&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYC_bWKKnncLr_SxJ0uWZf8H0Znb88D2Yyj9L4XJ5sregw&oe=66C4FAAC",
    statistics: {
      likeCount: 68,
      commentCount: 8,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_341543772675856",
    description: "",
    publishedAt: "2014-08-24T12:24:54+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 2,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1020020858161474",
    description: "#Ek_thi_daayan",
    publishedAt: "2018-06-22T10:44:13+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/33923724_1020021314828095_6071650186654908416_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=282d23&_nc_ohc=33gEcaEm_TEQ7kNvgF5ovEB&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYATypyxfZo7hGT2eoKTZrU0QLsFOeexuDF-EuriIUui5A&oe=66C4F837",
    statistics: {
      likeCount: 16,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1012261515604075",
    description: "#First_sight_love",
    publishedAt: "2018-06-14T06:26:04+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/30818241_1012261835604043_7043896113769742336_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=282d23&_nc_ohc=jrxubf8IZ2cQ7kNvgGxJFpp&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCVPKrgFU1ZX4xXIhb4nxVH6VuaSP0bSE9wF6pK_7UMZg&oe=66C4E79A",
    statistics: {
      likeCount: 24,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1011421465688080",
    description: "#Samajhdaar_ko_ishara_kaphi",
    publishedAt: "2018-06-13T04:55:40+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/30833831_1011421655688061_8937940566335815680_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=282d23&_nc_ohc=52qQVLEDWdQQ7kNvgEtI7az&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBqE5fw_eqz2lzdGh7dSG_aCX_J4y9ONTmcOF9orrjcbg&oe=66C4E969",
    statistics: {
      likeCount: 16,
      commentCount: 0,
      shareCount: 2,
    },
  },
  {
    postId: "2721794817984061_1010722682424625",
    description: "#Faisla",
    publishedAt: "2018-06-12T04:25:01+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/30817045_1010722869091273_1814751681175355392_n.jpg?stp=dst-jpg_s720x720&_nc_cat=111&ccb=1-7&_nc_sid=282d23&_nc_ohc=h5-7cBBYyUQQ7kNvgGGNx9I&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDkxfM9PYx3dGZptCHGUbgQ-JHiFQ0Amq7OgHvqUyNAYA&oe=66C4FAAF",
    statistics: {
      likeCount: 32,
      commentCount: 2,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_1007820166048210",
    description: "#Phone_do_naa",
    publishedAt: "2018-06-07T04:34:45+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/29785614_1007820299381530_349190839848665088_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=282d23&_nc_ohc=U5dfXd_RK3AQ7kNvgEr51Ws&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBmlZ4aMb2JVFgUTM4NH1AxwsyASMBOQfXmldayRUUWKQ&oe=66C4F3CE",
    statistics: {
      likeCount: 22,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_996225197207707",
    description: "#When_yr_crush_getting_married_to_some_other_guy",
    publishedAt: "2018-05-16T09:09:14+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/30818650_996225290541031_9068125672232189952_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=282d23&_nc_ohc=L0p5G2Kbp0kQ7kNvgEWvRSf&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYC__fLdej_0IU6GE4bT-LYBGooHgai7uFSZ2qZvkZ_MUQ&oe=66C4FCD1",
    statistics: {
      likeCount: 32,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_995710027259224",
    description: "11/05 Attack",
    publishedAt: "2018-05-15T08:47:11+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/29784125_995710200592540_3475508482478702592_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=282d23&_nc_ohc=aAWyNTPSu1MQ7kNvgHzyTbM&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDezfzs_-0jnnygo-rB9352DtML4L81ATMjLUyrqmqgaA&oe=66C51374",
    statistics: {
      likeCount: 44,
      commentCount: 4,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_992632524233641",
    description: "#After_my_today's_exam",
    publishedAt: "2018-05-09T08:01:56+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/29771066_992632610900299_5481700505442844672_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=282d23&_nc_ohc=rWLeTky2XsgQ7kNvgHZp4WG&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDHnEwhi2n7IO9OJ62w8R0uYnxajwTDvVlC-u9U8-Kdvw&oe=66C4EDAB",
    statistics: {
      likeCount: 44,
      commentCount: 3,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_987572264739667",
    description: "#FarewellParty",
    publishedAt: "2018-04-30T02:55:40+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.6435-9/31499012_987572238073003_2246736098782871552_n.jpg?stp=dst-jpg_p720x720&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=BFPRAbm-xK8Q7kNvgEUkLa0&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBQbA3P9BOJUHexwaid5F5Ni48J0_Y6yWpv7KKl9AWNNA&oe=66E686F2",
    statistics: {
      likeCount: 163,
      commentCount: 6,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_986553078174919",
    description: "PRODUCER TAKEN IT IN A WRONG WAY😂😂",
    publishedAt: "2018-04-28T04:53:39+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/28771884_986553208174906_3379257827288678400_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=282d23&_nc_ohc=TzGcVVdCHPMQ7kNvgH1ALWT&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYCWvuNRvVo8j3cJRxwEjubm-5sptQeou-FAvq-GayT9hQ&oe=66C4FCE6",
    statistics: {
      likeCount: 33,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_986062591557301",
    description: "#ShuffleDance",
    publishedAt: "2018-04-27T04:46:08+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/30842436_986062704890623_271461848870551552_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=282d23&_nc_ohc=qkulQZRbWQAQ7kNvgFIwNs4&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBf52ztbMQB-TbM_64-5on2QW4Cq1-gsp0wilvCbcSalA&oe=66C50CC3",
    statistics: {
      likeCount: 31,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_984432761720284",
    description: "Dhaka",
    publishedAt: "2018-04-24T05:52:34+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/28760439_984432975053596_210037275302559744_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=282d23&_nc_ohc=Kd6yulVd1hYQ7kNvgGWW9TO&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBUo2KVEuxzGt6LoOoJLNDuHpBWjV7-LPCZI4N_Fvo1_w&oe=66C4F4F1",
    statistics: {
      likeCount: 24,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_982364285260465",
    description: "#DekhaTumkoJabse",
    publishedAt: "2018-04-20T04:38:33+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/27861059_982364431927117_6220449603502735360_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=282d23&_nc_ohc=q1Pkrs4RiPEQ7kNvgGHabtl&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYDivU0J3QoBkaaznzG0B9T1T324HByI6q2ueEED8PrdqQ&oe=66C4F695",
    statistics: {
      likeCount: 26,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_980351372128423",
    description: "Dhamaal",
    publishedAt: "2018-04-16T03:46:41+0000",
    contentType: "video",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t15.5256-10/29781361_980351558795071_5729402191504998400_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=282d23&_nc_ohc=bEDDKwin5yQQ7kNvgHpoLad&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYAXbaWVyRPPbYNjhEb-BlycPLgH6eC9hjgo7PqPHuHK1A&oe=66C4F53D",
    statistics: {
      likeCount: 18,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_295629743933926",
    description: "",
    publishedAt: "2014-05-09T15:37:08+0000",
    contentType: "text",
    postURL: "",
    statistics: {
      likeCount: 3,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_2919327025039146",
    description: "",
    publishedAt: "2014-04-30T07:18:49+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t1.18169-9/10171020_705487716164207_4330881010808320467_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0327a3&_nc_ohc=8Zj6N1ueeyUQ7kNvgHme0A0&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYAQdiNAKj5ovnknvPo1N3qBRNueae8wgH8W2XkiaOWBnA&oe=66E68E5D",
    statistics: {
      likeCount: 1,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_279234458906788",
    description: "good night frndz",
    publishedAt: "2014-03-25T18:40:10+0000",
    contentType: "text",
    postURL: "",
    statistics: {
      likeCount: 2,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_185187838311451",
    description: "",
    publishedAt: "2013-06-14T09:39:08+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_250505381779696",
    description: "happy new year to all my frnds",
    publishedAt: "2013-12-31T18:47:30+0000",
    contentType: "text",
    postURL: "",
    statistics: {
      likeCount: 4,
      commentCount: 1,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_248145955348972",
    description:
      "Monu jyotis ke pas kundali dikhane gya.    \nJyotis- Tera nam monu he or bibi ka nam jyoti he\nMonu-Ji ha\nJyotis- tune abhi 10 kilo chabal kharide he\nMonu- ap to antaryami he maharaj\nJyotis- dafa ho jao yha se or agli bar kundali lana rashan card nhi",
    publishedAt: "2013-12-25T06:26:15+0000",
    contentType: "text",
    postURL: "",
    statistics: {
      likeCount: 2,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_168059456690956",
    description: "",
    publishedAt: "2013-05-02T10:42:49+0000",
    contentType: "image",
    postURL:
      "https://scontent.fpnq15-1.fna.fbcdn.net/v/t39.30808-6/454960564_2746492658847610_7482589437961971396_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9eae26&_nc_ohc=l12cACAWeecQ7kNvgHNe0qW&_nc_ht=scontent.fpnq15-1.fna&edm=ACwmWnUEAAAA&oh=00_AYBGKV5MdDWOvA4rOJcDvPsWkpd0LktSy1DfZCNa1FGc3g&oe=66C50C85",
    statistics: {
      likeCount: 6,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_185187838311451",
    description: "",
    publishedAt: "2013-06-14T09:39:08+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_112290792267823",
    description: "",
    publishedAt: "2012-11-16T11:24:56+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_112290792267823",
    description: "",
    publishedAt: "2012-11-16T11:24:56+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
  },
  {
    postId: "2721794817984061_327533197410247",
    description: "",
    publishedAt: "1996-03-15T08:00:00+0000",
    contentType: "link",
    postURL: "",
    statistics: {
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
  },
];

// src/constant/data.js
export const youtubeOverviewStats = [
  {
    title: "Total Views",
    icon: <FaUserFriends className="h-10 w-10 text-[#01A9FC]" />,
    count: 15000,
    percentage: 10,
    chartData: [
      { Date: "2024-08-01", value: 4000 },
      { Date: "2024-08-02", value: 3000 },
      { Date: "2024-08-03", value: 2000 },
      { Date: "2024-08-04", value: 2780 },
      { Date: "2024-08-05", value: 1890 },
      { Date: "2024-08-06", value: 2390 },
      { Date: "2024-08-07", value: 3490 },
    ],
  },
  {
    title: "Total Posts",
    icon: <BsFillFileTextFill className="h-6 w-6 text-[#01A9FC]" />,
    count: 120,
    percentage: 8,
    chartData: [
      { Date: "2024-08-01", value: 10 },
      { Date: "2024-08-02", value: 20 },
      { Date: "2024-08-03", value: 15 },
      { Date: "2024-08-04", value: 18 },
      { Date: "2024-08-05", value: 12 },
      { Date: "2024-08-06", value: 20 },
      { Date: "2024-08-07", value: 25 },
    ],
  },
  {
    title: "Total Subscribers",
    icon: <FaUserFriends className="h-8 w-8 text-[#01A9FC]" />,
    count: 5000,
    percentage: 12,
    chartData: [
      { Date: "2024-08-01", value: 100 },
      { Date: "2024-08-02", value: 150 },
      { Date: "2024-08-03", value: 120 },
      { Date: "2024-08-04", value: 110 },
      { Date: "2024-08-05", value: 130 },
      { Date: "2024-08-06", value: 140 },
      { Date: "2024-08-07", value: 150 },
    ],
  },
  {
    title: "Total Likes",
    icon: <AiFillLike className="h-8 w-8 text-[#01A9FC]" />,
    count: 8000,
    percentage: 15,
    chartData: [
      { Date: "2024-08-01", value: 2400 },
      { Date: "2024-08-02", value: 1398 },
      { Date: "2024-08-03", value: 9800 },
      { Date: "2024-08-04", value: 3908 },
      { Date: "2024-08-05", value: 4800 },
      { Date: "2024-08-06", value: 3800 },
      { Date: "2024-08-07", value: 4300 },
    ],
  },
  {
    title: "Total Comments",
    icon: <FaComments className="h-8 w-8 text-[#01A9FC]" />,
    count: 500,
    percentage: 5,
    chartData: [
      { Date: "2024-08-01", value: 240 },
      { Date: "2024-08-02", value: 221 },
      { Date: "2024-08-03", value: 229 },
      { Date: "2024-08-04", value: 200 },
      { Date: "2024-08-05", value: 218 },
      { Date: "2024-08-06", value: 250 },
      { Date: "2024-08-07", value: 210 },
    ],
  },
];
