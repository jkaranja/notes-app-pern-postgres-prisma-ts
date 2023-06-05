import { BaseQueryApi } from "@reduxjs/toolkit/dist/query";
import {
  BaseQueryExtraOptions,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import axios, { AxiosError } from "axios";
import React from "react";
import { BASE_URL } from "../config/urls";
import { setUploadProgress } from "../features/notes/notesSlice";
import axiosPrivate from "./axiosPrivate";
//see Typing a queryFn
//use this inside endpoint or look for types for each param of queryFn
//implement your own refetching eg use axiosPrivate
//Individual endpoints on createApi accept a queryFn property which allows a given endpoint to ignore baseQuery for that endpoint by providing an inline function determining how that query resolves.
//https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-queryfn
//https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-queryfn
//https://redux-toolkit.js.org/rtk-query/usage-with-typescript#typing-a-basequery

//NOT TESTED//USED IN PLACE OF fetchBaseQuery AS AXIOS SUPPORT FILE PROGRESS
const fileUploadMutation = ({ endpoint }: { endpoint: string }) => {
  return async (
    formData: FormData,
    api: BaseQueryApi,
    extraOptions: { [key: string]: string },
    baseQuery: BaseQueryFn
  ) => {
    try {
      const token = (api.getState() as { auth: { token: string } }).auth.token;
      const result = await axiosPrivate({
        token,
        contentType: "multipart/form-data",
      }).post(BASE_URL + endpoint, formData, {
        //...config options i.e headers, progress
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor(
            ((loaded / 1000) * 100) / (total! / 1000)
          );
          api.dispatch(setUploadProgress(percentage));
        },
      });

      return { data: result.data }; //queryFn must return data property
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      //queryFn must return error property as well
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err,
        },
      };
    }
  };
};

export default fileUploadMutation;
