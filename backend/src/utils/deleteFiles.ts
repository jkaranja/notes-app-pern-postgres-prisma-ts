import fs from "fs";
import { INoteFile } from "../models/noteModel";
const deleteFiles = (files: INoteFile[]) => {
  try {
    if (!files?.length) return null;

    files.forEach((file) => {
      fs.unlinkSync(file.path);
    });

    return "deleted";
  } catch (e) {
    return null;
  }
};

export default deleteFiles;
