import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import showToast from "../../../common/showToast";
import { PWD_REGEX } from "../../../constants/regex";
import { User } from "../../../types/user";
import { useUpdateUserMutation } from "../../user/userApiSlice";
import ConfirmPwd from "./ConfirmPwd";

type ChangePwdProps = {
  user: User;
};

function ChangePwd({ user }: ChangePwdProps) {
  const [pwdCaption, setPwdCaption] = useState(false);

  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  //new pwd handler
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
  };

  //confirm password handler
  const handleConfirmShowPass = () => setShowConfirmPass((show) => !show);
  const handleMouseDownConfirmPass: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
  };

  //dialog
  const [openD, setOpenD] = useState(false);
  const handleOpenD = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };
  //end of dialog
  type ChangePwdInputs = {
    newPassword: string;
    confirmPassword: string;
  };

  //pwd hook
  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    formState: { errors: pwdErrors, isValid: isValidP },
    watch: pwdWatch,
    reset: resetPwd,
  } = useForm<ChangePwdInputs>();

  const [updateUser, { data, error, isLoading, isError, isSuccess }] =
    useUpdateUserMutation();
  /**--------------------------------
   HANDLE PWD SUBMIT
 -------------------------------------*/
  const onSubmitPwd = (password: string) => {
    return async ({ newPassword }: ChangePwdInputs) => {
      const formData = new FormData();
      formData.append("newPassword", newPassword);

      formData.append("password", password);

      await updateUser({
        userData: formData,
        id: user.id,
      });
    };
  };

  //feedback
  useEffect(() => {
    if (isSuccess) {
      resetPwd({ newPassword: "", confirmPassword: "" });
    }

    showToast({
      message: error ? error : "Updated",
      isLoading,
      isSuccess,
      isError,
    });
  }, [isSuccess, isError, isLoading]);

  //dialog props
  const dialogProps = {
    open: openD,
    handleClose: handleCloseD,
    handleSubmit: handlePwdSubmit,
    onSubmit: onSubmitPwd,
  };

  return (
    <Box component={Paper} p={3}>
      {openD && <ConfirmPwd {...dialogProps} />}
      <Typography variant="h6" gutterBottom mb={3}>
        Change Password
      </Typography>
      <Box sx={{ maxWidth: { md: "40vw" } }}>
        <form>
          {/* ----------new pass------------ */}
          <FormGroup sx={{ mb: 0.5 }}>
            <TextField
              {...registerPwd("newPassword", {
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
              InputLabelProps={{
                shrink: true,
              }}
              color="secondary"
              margin="dense"
              label="Password"
              type={showNewPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onFocus={() => setPwdCaption(true)}
            />
            <Typography color="error.main" variant="caption">
              {pwdErrors.newPassword?.message}
            </Typography>
            {pwdCaption && (
              <Typography variant="caption" color="muted.main" gutterBottom>
                At least 6 characters with no spaces
              </Typography>
            )}
          </FormGroup>
          {/* ----------confirm pass------------ */}
          <FormGroup sx={{ mb: 2 }}>
            <TextField
              {...registerPwd("confirmPassword", {
                required: "Password is required",
                validate: (value) =>
                  pwdWatch("newPassword") === value || "Passwords don't match",
              })}
              InputLabelProps={{
                shrink: true,
              }}
              color="secondary"
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
              {pwdErrors.confirmPassword?.message}
            </Typography>
          </FormGroup>
          <Button
            onClick={() => {
              !isValidP && handlePwdSubmit(() => {})();
              isValidP && handleOpenD();
            }}
            color="secondary"
            variant="contained"
            disableElevation
          >
            Change password
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ChangePwd;
