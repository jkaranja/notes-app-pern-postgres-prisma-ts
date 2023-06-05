import express from "express";

const router = express.Router();

import * as userController from "../controllers/userController";
import verifyJWT from "../middleware/authMiddleware";
import requestLimiter from "../middleware/requestLimiter";
import { upload } from "../utils/cloudnary";

router.route("/register").post(userController.registerUser);

router
  .route("/resend/email")
  .post(requestLimiter, userController.resendVerifyEmail);

//this will apply protected middleware(require access token) to all private routes below//put public user routes above
router.use(verifyJWT);

router.route("/").get(userController.getUser);

router
  .route("/:id")
  .patch(upload.single("profilePic"), userController.updateUser)
  .delete(userController.deleteUser);

export default router;
