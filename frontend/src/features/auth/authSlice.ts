import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Define a type for the slice state
interface AuthState {
  token: null | string;
}

//In some cases, TypeScript may unnecessarily tighten the type of the initial state. If that happens, you can work around it by casting the initial state using as, instead of declaring the type of the variable:
// Workaround: cast state instead of declaring variable type
// const initialState = {
//   value: 0,
// } as CounterState

const initialState: AuthState = {
  token: null,
};

//slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOut: (state) => {
      state.token = null;
    },
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
