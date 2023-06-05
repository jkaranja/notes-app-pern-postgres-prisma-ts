import React, { useEffect, useState } from "react";

import { Alert, Box, Button, Link, Snackbar, Typography } from "@mui/material";

import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

import jwtDecode, { JwtPayload } from "jwt-decode";

import { useDispatch } from "react-redux";
import showToast from "../../common/showToast";
import { useResendVerifyEmailMutation } from "./userApiSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resendVerifyEmail, { data, error, isLoading, isError, isSuccess }] =
    useResendVerifyEmailMutation();

  type customJwtPayload = JwtPayload & { email: string };

  // document.cookie; //returns a string with list of all cookies separated by semicolon

  //use regex to extract a cookie by name/key //or use js-cookie
  let token = document.cookie.replace(
    /(?:(?:^|.*;\s*)resend\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const decode = () => {
    try {
      return jwtDecode<customJwtPayload>(token);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const email = decode()?.email;

  const handleResend = async () => {
    await resendVerifyEmail();
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
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Card sx={{ pt: 4, px: 2, pb: 2, maxWidth: "450px" }}>
        <form>
          <CardHeader
            title={
              <Typography variant="h4" gutterBottom>
                Verify your email
              </Typography>
            }
            subheader={
              token ? (
                <Typography variant="body1">
                  We've sent a verification link to your email address:
                  <Typography
                    variant="body1"
                    component="span"
                    px={1}
                    fontWeight="bold"
                  >
                    {email || "..."}.
                  </Typography>
                  Please click the link to activate your account.
                </Typography>
              ) : (
                <Typography gutterBottom paragraph mt={3} color="error.main">
                  Link has expired!
                </Typography>
              )
            }
          />
          <CardContent>
            {/* <Button
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => navigate("/orders")}
            >
              Skip for now
            </Button> */}
          </CardContent>
          <CardActions sx={{ display: "block" }}>
            {token && (
              <Box>
                <Typography component="span" px={1}>
                  Didn't get the mail?
                </Typography>

                <Link
                  color="secondary"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={handleResend}
                >
                  Resend
                </Link>
              </Box>
            )}
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default VerifyEmail;
