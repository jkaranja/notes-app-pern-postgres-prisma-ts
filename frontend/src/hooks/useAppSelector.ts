import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../app/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//For useSelector, it saves you the need to type (state: RootState) every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//usage
//// The `state` arg is correctly typed as `RootState` already
//const count = useAppSelector((state) => state.counter.value)
//or you can pass RootState tas count = useSelector((state: RootState) => state.counter.value)
