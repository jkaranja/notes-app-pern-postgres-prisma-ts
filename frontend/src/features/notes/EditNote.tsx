import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Intro from "../../components/Intro";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import showToast from "../../common/showToast";
import EditNoteForm from "./EditNoteForm";
import { useGetNoteQuery } from "./notesApiSlice";

const EditNote = () => {
  const navigate = useNavigate();

  const location = useLocation();

  type TParams = { id: string };

  const { id } = useParams<TParams>();

  const noteId = parseInt(id!);

 

  const from = location.state?.from?.pathname || "/notes";

  //fetch query
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

  //edit form props
  const formProps = {
    id: noteId!,
    note: note!,
  };

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
      <Intro>Edit note</Intro>
      <Box component={Paper} p={4}>
        <EditNoteForm {...formProps} />
      </Box>
    </Box>
  );
};

export default EditNote;
