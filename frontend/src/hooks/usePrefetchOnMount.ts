import { PrefetchOptions } from "@reduxjs/toolkit/dist/query/core/module";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "../app/api/apiSlice";

import { useAppDispatch } from "./useAppDispatch";

type EndpointNames = keyof typeof apiSlice.endpoints;

//custom hook for pre-fetching on mount
export function usePrefetchOnMount<T extends EndpointNames>(
  endpoint: T,
  arg: Parameters<typeof apiSlice.endpoints[T]["initiate"]>[0],
  options: PrefetchOptions = {}
) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    
    dispatch(apiSlice.util.prefetch(endpoint, arg as any, options));
  }, []);
}

// In a component
//usePrefetchOnMount('getUser', 5)
