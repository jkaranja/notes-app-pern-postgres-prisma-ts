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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import useTitle from "../../hooks/useTitle";

import { useForm } from "react-hook-form";

import { PWD_REGEX } from "../../constants/regex";
import showToast from "../../common/showToast";
import { useResetPwdMutation } from "./authApiSlice";

const Reset = () => {
  useTitle("Reset password");

  const [resetPwd, { data, error, isLoading, isError, isSuccess }] =
    useResetPwdMutation();

  const { token } = useParams();

  const [pwdCaption, setPwdCaption] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  //pass event handler
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  //confirm password handler
  const handleConfirmShowPass = () => setShowConfirmPass((show) => !show);
  const handleMouseDownConfirmPass: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
  };

  type ResetInputs = {
    confirmPassword: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetInputs>();

  const onSubmit = async (inputs: ResetInputs) => {
    await resetPwd({
      password: inputs.password,
      resetPwdToken: token!,
    });
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
      <Card sx={{ pt: 4, px: 2, pb: 2, minWidth: "450px" }}>
        <CardHeader
          title={
            <Typography variant="h4" gutterBottom>
              Reset password
            </Typography>
          }
          subheader="Enter your new password"
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ----------pass------------ */}

            <FormGroup sx={{ mb: 0.5 }}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Enter at least 6 characters",
                  },
                  pattern: {
                    value: PWD_REGEX,
                    message: "Spaces not allowed",
                  },
                })}
                color="secondary"
                fullWidth
                margin="dense"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onFocus={() => setPwdCaption(true)}
              />
              <Typography color="error.main" variant="caption">
                {errors.password?.message}
              </Typography>
              {pwdCaption && (
                <Typography variant="caption" color="muted.main" gutterBottom>
                  At least 6 characters with no spaces
                </Typography>
              )}
            </FormGroup>
            {/* ----------confirm pass------------ */}
            <FormGroup sx={{ mb: 0.5 }}>
              <TextField
                {...register("confirmPassword", {
                  required: "Password is required",
                  validate: (value) =>
                    watch("password") === value || "Passwords don't match",
                })}
                color="secondary"
                fullWidth
                margin="dense"
                label="Confirm Password"
                type={showConfirmPass ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleConfirmShowPass}
                        onMouseDown={handleMouseDownConfirmPass}
                        edge="end"
                      >
                        {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography color="error.main" variant="caption">
                {errors.confirmPassword?.message}
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
              Set new password
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

export default Reset;
