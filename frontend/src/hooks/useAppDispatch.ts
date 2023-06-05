// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../app/store";
//For useDispatch, the default Dispatch type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized AppDispatch type from the store that includes the thunk middleware types, and use that with useDispatch. Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.
//else Ts will say can't dispatch thunks because those aren't plain action objects.

//While it's possible to import AppDispatch types into each component(i.e const dispatch: AppDispatch  = useDispatch()), it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.

export const useAppDispatch: () => AppDispatch = useDispatch;

//usage const dispatch = useAppDispatch(); //the useDispatch is now typed correctly
//or you can also pass the AppDispatch to any 'dispatch' function eg in createAsyncThunk,
//useDispatch returns the usual dispatch function = useDispatch() =store.dispatch
