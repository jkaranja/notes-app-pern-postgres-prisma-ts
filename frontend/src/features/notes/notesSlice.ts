import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Define a type for the slice state
interface NotesState {
  uploadProgress: number;
}

//slice state
const initialState: NotesState = {
  uploadProgress: 0,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
});

export const { setUploadProgress } = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
