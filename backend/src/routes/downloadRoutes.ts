import express from "express";
const router = express.Router();
import * as downloadController from "../controllers/downloadController";
import verifyJWT from "../middleware/authMiddleware";

//router.use(verifyJWT);
router.route("/single").post(downloadController.singleDownload);

router.route("/zip").post(downloadController.zipDownload);

export default router;
