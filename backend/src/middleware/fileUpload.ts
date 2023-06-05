import { Request } from "express";
import fs from "fs";
import multer from "multer";
import { FileFilterCallback } from "multer";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const multerStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "uploads");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    ////if not set/multer generates a random filename with no extension
    // file name can't contain:  ?*: /\"<>|
    //set file name by first checking if it exist
    fs.stat(`uploads/${file.originalname}`, (err, stat) => {
      if (err == null) {
        // The check succeeded//file exist//add date to rename
        //    //below, replaces : with - ///g=global..apply to all matches not just the first match
        const uploadedFileName =
          new Date().toISOString().replace(/[:.]/g, "-") +
          "-" +
          file.originalname;
        //const uploadedFileName = Date.now() + '-' + file.originalname;
        cb(null, uploadedFileName);
      } else if (err.code == "ENOENT") {
        //if doesn't exist, keep orig name
        cb(null, file.originalname);
      } else {
        //terminate upload and forward error
        cb(
          new Error(
            `Failed! Please forward this error to support: ${err.code}`
          ),
          file.originalname //must pass this with Ts as cb expects 2 args//any string is okay//
        );
      }

      //
    });
  },
});

// Multer Filter//no filter currently
const multerFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  //working//match these file types
  if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
    return cb(null, false);
  }
  cb(null, true); //if correct type
  //fileType //extract ex// image/jpeg
  const fileType = file.mimetype.split("/")[1];
  cb(null, true);
  // if (fileType === "pdf") {
  //   cb(null, true);
  // } else { //error caught by error handler
  //   cb(new Error("Not a PDF File!!"), false);
  // }
};

//filter/limit is optional
export default multer({
  storage: multerStorage,
  // limits: {fileSize: 1000000, files:1},
  // fileFilter: multerFilter,
});
