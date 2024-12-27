import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const jwtValidate = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({ error: "Token not provided / Access Denied" });
   console.log(process.env.JWT_SECRET);
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json("User is not Authorized / Token is Invalid");

      req.token = decoded;
      next();
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
});

export default jwtValidate;