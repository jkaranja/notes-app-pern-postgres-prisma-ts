import React from "react";

import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/system";


import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";

const TwoFactor = () => {
  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Card sx={{ pt: 4, px: 2, pb: 2, maxWidth: "450px" }}>
        <form>
          <CardHeader
            title={
              <Typography variant="h4" gutterBottom>
                Two Step Verification
              </Typography>
            }
            subheader={
              <>
                We sent a verification code to your mobile. Enter the code from
                the mobile in the field below.
                <Typography variant="h6" pt={1}>
                  ******1234
                </Typography>
              </>
            }
          />
          <CardContent sx={{ pt: 1 }}>
            <Typography variant="body1" gutterBottom mb={1}>
              Type your 6 digit security code
            </Typography>
            <Box sx={{ display: "flex" }} justifyContent="space-between">
              {[...Array(6)].map(() => (
                <TextField
                  sx={{ width: "15%" }}
                  required
                  //name//as norm text
                  // value={name}
                  // onChange={handleChange}
                  color="secondary"
                />
              ))}
            </Box>

            <Button
              type="submit"
              size="large"
              sx={{ mt: 3 }}
              variant="contained"
              fullWidth
              color="secondary"
            >
              Verify my account
            </Button>
          </CardContent>
          <CardActions sx={{ display: "block", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "muted.main" }}>
              Didn't get the code? <Link to="/login">Resend</Link>
            </Typography>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default TwoFactor;
