import React, { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Button,
  FormGroup,
  FormLabel,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Intro from "../../components/Intro";

import PostNoteForm from "./PostNoteForm";

const PostNote = () => {
  //post form props
  const formProps = {
    //...
  };

  return (
    <Box>
      <Intro>Post new note</Intro>
      <Box component={Paper} p={4}>
        <PostNoteForm {...formProps} />
      </Box>
    </Box>
  );
};

export default PostNote;
