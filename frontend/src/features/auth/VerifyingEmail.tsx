import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";

import { Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import { useDispatch, useSelector } from "react-redux";

import { useConfirmEmailMutation } from "./authApiSlice";

const VerifyingEmail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [confirmEmail, { data, error, isLoading, isError, isSuccess }] =
    useConfirmEmailMutation();

  type TParams = { token: string };
  const { token } = useParams();

  useEffect(() => {
    if (isSuccess || isError || isLoading) return;

    const confirm = async () => {
      await confirmEmail(token!);
    };
    confirm();
  }, []);

  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Card sx={{ pt: 4, px: 2, pb: 2, minWidth: "450px" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex" }} justifyContent="center">
              {isLoading && (
                <CircularProgress size={45} color="inherit" thickness={2} />
              )}

              {isSuccess && (
                <Avatar sx={{ width: 45, height: 45, bgcolor: "success.main" }}>
                  {" "}
                  <CheckIcon />{" "}
                </Avatar>
              )}
              {isError && (
                <Avatar sx={{ width: 45, height: 45, bgcolor: "error.main" }}>
                  {" "}
                  <ClearIcon />{" "}
                </Avatar>
              )}
            </Box>
          }
        />
        <CardContent>
          <Typography gutterBottom paragraph mb={5} align="center">
            {error || data?.message}
            {(isLoading as any) && "Loading..."}
          </Typography>

          {isSuccess && (
            <Button
              type="submit"
              size="large"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => navigate("/notes")}
            >
              Proceed to account
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyingEmail;
