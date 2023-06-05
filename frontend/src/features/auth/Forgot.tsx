import React, { useEffect, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/system";

import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";

import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import InputAdornment from "@mui/material/InputAdornment";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import useTitle from "../../hooks/useTitle";

import { EMAIL_REGEX } from "../../constants/regex";
import { useForgotPwdMutation } from "./authApiSlice";
import showToast from "../../common/showToast";

const Forgot = () => {
  useTitle("Forgot password");

  const [forgotPwd, { data, error, isLoading, isError, isSuccess }] =
    useForgotPwdMutation();

  type ForgotInputs = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>();

  const onSubmit = async (inputs: ForgotInputs) => {
    await forgotPwd(inputs);
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
        <CardHeader
          title={
            <Typography variant="h4" gutterBottom>
              Forgot Password?
            </Typography>
          }
          subheader="Enter your email and we′ll send you instructions to reset your password"
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mb: 0.5 }}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "Enter an email address",
                  },
                })}
                id="outlined-basic"
                label="Email"
                color="secondary"
              />
              <Typography color="error.main" variant="caption">
                {errors.email?.message}
              </Typography>
            </FormGroup>

            <Button
              type="submit"
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              color="secondary"
            >
              Send reset link
            </Button>
          </form>
        </CardContent>
        <CardActions sx={{ display: "block", textAlign: "center" }}>
          <Button
            component={Link}
            to="/login"
            color="secondary"
            startIcon={<ChevronLeftIcon color="secondary" fontSize="small" />}
            sx={{ textTransform: "none" }}
          >
            Back to login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Forgot;
