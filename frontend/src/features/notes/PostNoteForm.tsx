import {
  Box,
  Button,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import showToast from "../../common/showToast";
import DatePicker from "../../components/DatePicker";
import Dropzone from "../../components/Dropzone";
import { useAddNoteMutation } from "./notesApiSlice";
import { selectNotes } from "./notesSlice";

const PostNoteForm = ({}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { uploadProgress } = useSelector(selectNotes);

  const [addNote, { data, error, isLoading, isError, isSuccess }] =
    useAddNoteMutation();

  type PostNoteInputs = Record<string, string> & {
    title: string;
    content: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<PostNoteInputs>();

  ///submit note form //form.append('key', value of type: string | Blob)
  const onSubmitNote = async (inputs: PostNoteInputs) => {
    if (!selectedDate) return null;

    const formData = new FormData();

    selectedFiles.forEach((file, i) => {
      formData.append("files", selectedFiles[i]);
    });

    formData.append("deadline", selectedDate.toISOString());

    Object.keys(inputs).forEach((field, i) => {
      formData.append(field, inputs[field]);
    });

    await addNote(formData);
  };

  ////feedback & reset form
  useEffect(() => {
    if (isSuccess) {
      resetForm({ content: "", title: "" });
      setSelectedFiles([]);
    }
    showToast({
      message: error || data?.message,
      isLoading,
      isError,
      isSuccess,
      progress: uploadProgress,
    });
  }, [isSuccess, isError, isLoading, uploadProgress]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitNote)}>
        <Typography variant="body1" gutterBottom>
          Enter note details
        </Typography>
        <Grid2
          container
          justifyContent="space-around"
          spacing={5}
          rowSpacing={0}
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Grid2 xs>
            <FormGroup sx={{ mb: 2 }}>
              <TextField
                {...register("title", {
                  required: "Title is required",
                })}
                size="small"
                color="secondary"
                label="Title"
                margin="dense"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Typography color="error.main" variant="caption">
                {errors.title?.message}
              </Typography>
            </FormGroup>
          </Grid2>
          <Grid2 xs>
            <FormGroup sx={{ mb: 2 }}>
              <DatePicker
                size="small"
                color="secondary"
                label="Deadline"
                margin="dense"
                fullWidth
                showTimeSelect={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <Typography color="error.main" variant="caption">
                {!selectedDate && "Deadline is required"}
              </Typography>
            </FormGroup>
          </Grid2>
        </Grid2>

        <FormGroup sx={{ mb: 2 }}>
          <TextField
            {...register("content", {
              required: "Note content is required",
            })}
            size="small"
            color="secondary"
            label="Note content"
            margin="dense"
            multiline
            minRows={4}
            maxRows={7}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography color="error.main" variant="caption">
            {errors.content?.message}
          </Typography>
        </FormGroup>

        <FormGroup sx={{ mb: 4 }}>
          <FormLabel>Attach files</FormLabel>
          <Dropzone
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        </FormGroup>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" color="secondary">
            Post note
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PostNoteForm;
