//import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";//this don't auto-generate react hooks//won't work with hooks
/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/urls";
import { setCredentials, logOut } from "../../features/auth/authSlice";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }
    if (!headers.has("Authorization") && token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown, //ReturnType//returned by query function: build.query<Post, number>//Post//unknown since each endpoint returned type is different
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes//catch only 401 unauthorized// invalid access token
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      //dispatch to store is synchronous//so retry for the original query won't fire until the store gets the new token
      //so headers will have the new token when the retry req is sent
      api.dispatch(
        setCredentials(
          (refreshResult.data as { accessToken: string }).accessToken
        )
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        console.log("Your login has expired.");
        (refreshResult.error.data as { message: string }).message =
          "Your login has expired.";
        api.dispatch(logOut());
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  //global settings
  //refetchOnMountOrArgChange: true, //always refetch on mount//avoid stale state
  //refetchOnReconnect: true, //refetch after regaining a network connection.
  tagTypes: ["Note", "User"], //defines tags//can be ["Post", "User"],//possible tags that could be provided by endpoints

  endpoints: () => ({}),
});
