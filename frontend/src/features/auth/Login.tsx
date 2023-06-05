import React, { useEffect, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Divider,
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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {  setCredentials } from "./authSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";

import { EMAIL_REGEX } from "../../constants/regex";
import {
  FACEBOOK_URL,
  GITHUB_URL,
  GOOGLE_URL,
  LINKEDIN_URL,
} from "../../config/urls";
import { useLoginMutation } from "./authApiSlice";
import showToast from "../../common/showToast";

const Login = () => {
  useTitle("Login");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { data, error, isLoading, isError, isSuccess }] =
    useLoginMutation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [persist, setPersist] = usePersist();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  const location = useLocation();

  const from = location.state?.from?.pathname || "/notes";

  ///navigate component from r-r-dom
  //const location = useLocation();
  //<Navigate to="/login" state={{ from: location }} replace /> //return component
  //or programmatically navigate('/login', { state: { from: location }, replace: true });

  //PASSING STATE BETWEEN COMPONENTS USING r-r-dom NAVIGATE
  //from component A: navigate('/', {state: {from: 'data'}, replace: true})
  //in component B: console.log(location.state.from) //output = whatever

type LoginInputs ={
  email: string;
  password: string;
}


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = async (inputs: LoginInputs) => {
  

    await login(inputs);
  };

  //on success
  if (isSuccess && data!.accessToken) {
    dispatch(setCredentials(data!.accessToken));
    navigate(from, { replace: true });
  }

  //feedback
  useEffect(() => {
    showToast({ message: error, isLoading, isError });




  }, [isSuccess, isError, isLoading]);

  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Card sx={{ pt: 4, px: 2, pb: 2, width: "450px" }} variant="outlined">
        <CardHeader
          title={
            <Typography variant="h4" gutterBottom>
              Welcome back
            </Typography>
          }
          subheader="Please sign-in to your account below"
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
                  // minLength: 6,
                  // pattern: PWD_REGEX,
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
              />
              <Typography color="error.main" variant="caption">
                {errors.password?.message}
              </Typography>
            </FormGroup>

            <Grid2 container justifyContent="space-between" alignItems="center">
              <FormGroup  sx={{ fontSize: "12px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={persist}
                      onChange={() => setPersist(!persist)}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "muted.main" }}>
                      Remember Me
                    </Typography>
                  }
                />
              </FormGroup>
              <Typography variant="body2">
                <Link to="/forgot">Forgot Password?</Link>
              </Typography>
            </Grid2>

            <Button
              type="submit"
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              color="secondary"
            >
              Log in
            </Button>
          </form>

          <Typography variant="body2" mt={3} sx={{ color: "muted.main" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>

          <Divider sx={{ pt: 2 }}> or </Divider>
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

export default Login;
