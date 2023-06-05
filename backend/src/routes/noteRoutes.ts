import express from "express";
const router = express.Router();
import * as noteController from "../controllers/noteController";
import verifyJWT from "../middleware/authMiddleware";

import upload from "../middleware/fileUpload";

router.use(verifyJWT);

router
  .route("/")
  .get(noteController.getAllNotes)
  .post(upload.array("files"), noteController.createNewNote);

router
  .route("/:noteId")
  .get(noteController.getNoteById)
  .patch(upload.array("files"), noteController.updateNote)
  .delete(noteController.deleteNote);

//when you have multiple fields containing files//max-count =max num of files eg also upload.array('photos', 12)
// const cpUpload = upload.fields([
//   { fieldName1: "avatar", maxCount: 1 },
//   { fieldName2: "gallery", maxCount: 8 },
// ]);
//returns req.files= {field1: [files], field2: [files]}

export default router;
