import { Box, Button, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary">
        We couldn't find the page you are looking for.
      </Typography>

      <Typography variant="body1" color="text.secondary" my={8}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
        >
          Back to home
        </Button>
      </Typography>
    </Box>
  );
};

export default NotFound;
