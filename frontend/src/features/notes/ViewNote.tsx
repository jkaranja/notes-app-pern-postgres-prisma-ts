import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Intro from "../../components/Intro";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import convertBytesToKB from "../../common/convertBytesToKB";
import DownloadIcon from "@mui/icons-material/Download";

import showToast from "../../common/showToast";
import { handleSingleDownload, handleZipDownload } from "../../api/downloadAPI";
import { selectCurrentToken } from "../auth/authSlice";
import { useGetNoteQuery, useGetNotesQuery } from "./notesApiSlice";

const ViewNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector(selectCurrentToken);

  type TParams = { id: string };

  const { id } = useParams<TParams>();

  const noteId = parseInt(id!);

  const from = location.state?.from?.pathname || "/notes";

  /* ----------------------------------------
   DOWNLOAD NOTE FILES
 

  /* ----------------------------------------
   FETCH NOTE
   ----------------------------------------*/
  //below works when you pass same exact query parameters from as parent//use when you have static query params
  // const noteRef = {}; //prevent re-rendering every time selectFrom cb runs as note object ref changes
  // const { note } = useGetNotesQuery(
  //   {},
  //   {
  //     selectFromResult: ({ data }) => ({
  //       note: data?.notes?.find((note) => note.noteId === id) ?? noteRef,
  //     }),
  //     refetchOnMountOrArgChange: false,
  //   }
  // );
  const {
    data: note,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNoteQuery(noteId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  //feedback
  useEffect(() => {
    showToast({
      message: error,
      isLoading: isFetching,
      isError,
      isSuccess,
    });
  }, [isSuccess, isError, isFetching]);

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        color="secondary"
        sx={{ fontWeight: "bold", mb: 2 }}
        onClick={() => navigate(from, { replace: true })}
      >
        Notes
      </Button>
      <Intro>Note details</Intro>
      <Box>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={<Typography variant="subtitle1">Title</Typography>}
          />
          <Divider />
          <CardContent>
            <Typography paragraph> {note?.title}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={<Typography variant="subtitle1">Note</Typography>}
          />
          <Divider />
          <CardContent>
            <Typography paragraph> {note?.content}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={<Typography variant="subtitle1">Note files</Typography>}
            action={
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => handleZipDownload({ files: note?.files, token })}
                sx={{ px: 2 }}
              >
                Download
              </Button>
            }
          />
          <Divider />
          <CardContent sx={{ px: 2 }}>
            {note?.files?.map((file, i) => (
              <Box className="dropzone-file-preview" key={i}>
                <Typography component="span">
                  {file.filename.slice(0, 50).trim()} ...
                </Typography>
                <Typography component="span">
                  {convertBytesToKB(file.size)} kb
                </Typography>
                <Button
                  startIcon={<DownloadIcon />}
                  onClick={() => handleSingleDownload({ file, token })}
                >
                  Download
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewNote;
