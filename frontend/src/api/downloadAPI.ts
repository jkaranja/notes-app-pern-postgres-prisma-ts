import axios, { AxiosError } from "axios";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import { NoteFile } from "../types/note";
import axiosPrivate from "./axiosPrivate";

interface DownloadParams {
  file?: NoteFile;
  files?: NoteFile[];
  token: string;
}

const handleSingleDownload = async ({ file, token }: DownloadParams) => {
  try {
    console.log(file);
    //console.log("Downloading...");
    const response = await axiosPrivate({ token }).post(
      `/api/download/single`,
      { filePath: file!.path }
      // { responseType: "blob" }
    );

    fileDownload(response.data, file!.filename);

    console.log("Downloaded!");
  } catch (error) {
    //Using AxiosError to cast error//type assertion
    //const error = e as AxiosError;
    //axios also provides a type guard for handling errors//better sol
    if (axios.isAxiosError(error)) {
      //console.log(error.status);
      //console.error(error.response);

      const e =
        error.response?.data?.message || error.message || error.toString();

      toast.info(e);
    } else {
      toast.info(error as string);
      console.error(error);
    }
  }
};

//multiple
const handleZipDownload = async ({ files, token }: DownloadParams) => {
  const filePaths = files!.map((file) => file.path);

  try {
    //console.log("Downloading...");
    const response = await axiosPrivate({ token }).post(
      `/api/download/zip`,
      { filePaths },
      { responseType: "blob" }
    );
    //FileDownload(response.data, "filename.zip");

    console.log("Downloaded!");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //console.log(error.status);
      //console.error(error.response);
      const e =
        error.response?.data?.message || error.message || error.toString();

      toast.info(e);
    } else {
      console.error(error);
       toast.info(error as string);
    }
  }
};

export { handleZipDownload, handleSingleDownload };
