import { Backdrop, CircularProgress } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import usePersist from "../../hooks/usePersist";

import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  const [persist] = usePersist();

  const [searchParams, setSearchParams] = useSearchParams();
  //set by oath success redirect//isAuthenticated = is a string since it is sent as query string
  const isAuthenticated = searchParams.get("authenticated");
//or use skipToken instead of mutation with GET mtd
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  let content;

  const location = useLocation();

  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    //fetch using refresh token in cookie and store access token in store
    //if error eg refresh has expired, go to login
    const getToken = async () => {
      await refresh();
    };
    if ((persist || isAuthenticated) && !token) getToken();
  }, []);

  if (isLoading) {
    content = (
      <Backdrop
        sx={{
          color: "#fff",
          bgcolor: "secondary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (isSuccess) {
    //no needed
    //after re-render due to state change// token=true below will catch this as well
    //allow protected access
    content = <Outlet />;
  } else if (isError) {
    //login page
    content = <Navigate to="/login" state={{ from: location }} replace />;
  } else if (token && isUninitialized) {
    //token: true// handles !persist && token / persist && token
    //allow protected access
    content = <Outlet />;
  } else if (!persist && !isAuthenticated && !token) {
    //login page
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content as JSX.Element;
};

export default RequireAuth;
