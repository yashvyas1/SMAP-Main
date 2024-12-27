import express from "express";
import {
  userRegistration,
  userLogin,
  validateaccess_token
} from "../Controllers/authController.js";
const authRouter = express.Router();

authRouter.route("/signup").post(userRegistration);
authRouter.route("/signin").post(userLogin);
authRouter.route('/tokenvalidate').post(validateaccess_token)

export default authRouter;