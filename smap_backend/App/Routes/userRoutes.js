import jwtValidate from '../Middeware/jwtValidate.js';
import { getUserDetails, dashboardOverviewData, facebookFollowersAndVisitsGraphsData, socialMediaConnection, followersByCountry, facebookPostsData, facebookReelsData, facebookSummaryData } from '../Controllers/userController.js';
import express from "express";
const userRouter = express.Router();

userRouter.route('/dashboard/userdetails').get(jwtValidate, getUserDetails)
userRouter.route('/dashboard/overview').get(jwtValidate, dashboardOverviewData)
userRouter.route('/facebookoverviewgraphs').get(jwtValidate, facebookFollowersAndVisitsGraphsData)
userRouter.route('/socialmediaconnection').post(jwtValidate, socialMediaConnection)
userRouter.route('/facebook/followersbycountry').get(jwtValidate, followersByCountry)
userRouter.route('/facebook/posts').get(jwtValidate, facebookPostsData)
userRouter.route('/facebook/reels').get(jwtValidate, facebookReelsData)
userRouter.route('/facebook/pagesummary').get(jwtValidate, facebookSummaryData)

export default userRouter;