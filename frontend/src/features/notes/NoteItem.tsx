import {
  Box,
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import showToast from "../../common/showToast";
import { useEffect } from "react";
import { useDeleteNoteMutation } from "./notesApiSlice";
import { Note } from "../../types/note";

type NoteItemProps = {
  note: Note;
  handleChecked: (id: number) => void;
};

const NoteItem = ({ note, handleChecked }: NoteItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ----------------------------------------
   HANDLE DELETE NOTE
   ----------------------------------------*/
  const [deleteNote, { data, isSuccess, isError, error, isLoading }] =
    useDeleteNoteMutation();

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
  };

  //feedback
  useEffect(() => {
    showToast({
      message: error || data?.message,
      isLoading,
      isError,
      isSuccess,
    });
  }, [isSuccess, isError, isLoading]);

  return (
    <TableRow
      key={note.noteId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell padding="checkbox" align="left">
        <Box
          sx={{ display: "flex" }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Checkbox
            checked={note.isChecked ? note.isChecked : false}
            onChange={() => handleChecked(note.noteId)}
          />
          <Typography
            component="span"
            color="secondary"
            onClick={() =>
              navigate(`/notes/view/${note.noteId}`, {
                state: { from: location },
                replace: true,
              })
            }
            sx={{ cursor: "pointer" }}
          >
            #{note.noteId}
          </Typography>
        </Box>
      </TableCell>
      <TableCell component="th" scope="row">
        {note.title}
      </TableCell>
      <TableCell>
        {new Date(note.updatedAt).toLocaleDateString("en-GB")}
      </TableCell>
      <TableCell>
        {new Date(note.deadline).toLocaleDateString("en-GB")}
      </TableCell>

      <TableCell align="center">
        <IconButton
          onClick={() =>
            navigate(`/notes/view/${note.noteId}`, {
              state: { from: location },
              replace: true,
            })
          }
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            navigate(`/notes/edit/${note.noteId}`, {
              state: { from: location },
              replace: true,
            })
          }
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            window.confirm("Are you sure? Note will be deleted") &&
            deleteNote(note.noteId)
          }
        >
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default NoteItem;
