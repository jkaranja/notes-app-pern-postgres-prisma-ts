import React, { useEffect, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Divider,
  Typography,
  TextField,
  Paper,
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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import useTitle from "../../hooks/useTitle";

import { reset, selectUser } from "./userSlice";

import { EMAIL_REGEX, PWD_REGEX } from "../../constants/regex";
import {
  FACEBOOK_URL,
  GITHUB_URL,
  GOOGLE_URL,
  LINKEDIN_URL,
} from "../../config/urls";
import { useRegisterUserMutation } from "./userApiSlice";
import showToast from "../../common/showToast";

const Signup = () => {
  useTitle("Sign up for free");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [registerUser, { data, error, isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [checkPolicy, setCheckPolicy] = useState(true);

  const [pwdCaption, setPwdCaption] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  interface SignUpInputs {
    username: string;
    password: string;
    email: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit = async (inputs: SignUpInputs) => {
    await registerUser(inputs);
  };

  if (isSuccess) navigate("/verify");

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
      <Card sx={{ pt: 4, px: 2, pb: 2, width: "450px" }} variant="outlined">
        <CardHeader
          title={
            <Typography variant="h4" gutterBottom>
              Create an account
            </Typography>
          }
          subheader="Please sign-up below"
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mb: 0.5 }}>
              <TextField
                {...register("username", { required: "Username is required" })}
                id="outlined-basic"
                label="Username"
                margin="dense"
                color="secondary"
              />
              <Typography color="error.main" variant="caption">
                {errors.username?.message}
              </Typography>
            </FormGroup>
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
                margin="dense"
                color="secondary"
              />
              <Typography color="error.main" variant="caption">
                {errors.email?.message}
              </Typography>
            </FormGroup>

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
                  //option2://value only eg pattern: 'regex', required: true, //then use errors.password && <span>..err</span>
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
                <Typography variant="caption" color="muted.main">
                  At least 6 characters with no spaces
                </Typography>
              )}
            </FormGroup>

            <FormGroup sx={{ fontSize: "12px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={checkPolicy}
                    onChange={() => setCheckPolicy(!checkPolicy)}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "muted.main" }}>
                    I agree to privacy policy & terms
                  </Typography>
                }
              />
            </FormGroup>

            <Button
              type="submit"
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              color="secondary"
              disabled={!checkPolicy}
            >
              Sign up
            </Button>
          </form>

          <Typography variant="body2" mt={3} sx={{ color: "muted.main" }}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>

          <Divider sx={{ pt: 2 }}> or </Divider>
          {/* 
              <Button
                sx={{ mb: 2 }}
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<GoogleIcon />}
              >
                Continue with Google
              </Button>
             
               */}
        </CardContent>
        <CardActions sx={{ display: "block", textAlign: "center" }}>
          <IconButton onClick={() => window.open(GOOGLE_URL, "_self")}>
            <GoogleIcon sx={{ color: "error.main" }} />
          </IconButton>
          <IconButton onClick={() => window.open(FACEBOOK_URL, "_self")}>
            <FacebookIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => window.open(LINKEDIN_URL, "_self")}>
            <LinkedInIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <IconButton onClick={() => window.open(GITHUB_URL, "_self")}>
            <GitHubIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Signup;
