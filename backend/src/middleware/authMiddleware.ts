import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const verifyJWT: RequestHandler = (req, res, next) => {
  const authHeader =
    (req.headers.authorization as string) ||
    (req.headers.Authorization as string);

  //retry only for expired tokens i.e has 'Bearer xxx' but token is expired
  //won't retry for 403 or any other status code
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const token = authHeader.split(" ")[1];
   //token exists but has expired//return 401 so req can be retried
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById((<{ id: string }>decoded).id)
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return res.status(403).json({
        message: "Forbidden. Please contact support",
      });
    }

    req.user = user;

    next();
  });
};

export default verifyJWT;
