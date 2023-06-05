import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";

//SLICE NOT CURRENTLY BEING USED IN APP

//TYPING CREATE ASYNC THUNK //
interface MyData {
  _id: string;
  username: string;
  [x: string]: string;
}

interface MyKnownError {
  errorMessage: string;
  // ...
}
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

//if not using thunkApi methods or properties, just type payload creator arg & returned value
// const fetchUserById = createAsyncThunk(
//   "users/fetchById",
//   // if you type your function argument here
//   async (userId: number) => {
//     const response = await fetch(`https://reqres.in/api/users/${userId}`);
//     return (await response.json()) as ResponseDataType;
//   }
// );

const updateUser = createAsyncThunk<
  // Return type of the payload creator//data returned from server//api
  MyData,
  // First argument to the payload creator//payload for api
  UserAttributes,
  // Types for ThunkAPI/Typing the thunkApi Object
  //add types for what you need inside the payload creator
  {
    /** return type for `thunkApi.getState` */
    state: RootState;
    /** type for `thunkApi.dispatch` */
    dispatch: AppDispatch;
    extra: {
      jwt: string;
    };
    rejectValue: MyKnownError;
  }
>("users/update", async (user, thunkApi) => {
  const { id, ...userData } = user;
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
    body: JSON.stringify(userData),
  });
  if (response.status === 400) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue((await response.json()) as MyKnownError);
  }
  return (await response.json()) as MyData;
});

// Define a type for the slice state
interface UserState {
  user: {};
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

//slice state
const initialState: UserState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    reset: (state, action: PayloadAction<string>) => initialState,
  },
  extraReducers: (builder) => {
    //use the "builder callback" approach//as long as initial state & payload creator are typed, action creators below will have the right types
    builder.addCase(updateUser.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    });
    
  },
});

export const { reset } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
