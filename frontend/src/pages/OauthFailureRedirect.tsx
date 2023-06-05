import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const OauthFailureRedirect = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center">
      <Typography variant="h1">oops!</Typography>
      <Typography variant="h6">
        We couldn't authenticate you using that service
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please choose a different service or use our sign up form
      </Typography>

      <Typography variant="body1" color="text.secondary" my={8}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
        >
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default OauthFailureRedirect;
