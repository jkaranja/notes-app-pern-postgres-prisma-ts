import { Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Card sx={{ pt: 4, px: 2, pb: 2, maxWidth: "450px" }}></Card>{" "}
    </Box>
  );
};

export default Contact;
