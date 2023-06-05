import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react'
import { User } from '../../../types/user';


type TwoFactorProps ={
  user: User
}

const TwoFactor = ({ user }: TwoFactorProps) => {
  return (
    <Box component={Paper} p={3} mt={3}>
      <Typography variant="h6">Two-factor authentication (2FA)</Typography>
      <Typography variant="caption" gutterBottom>
        Enhanced security for your mention account
      </Typography>
      <Typography pt={2} gutterBottom>
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          // onClick={handleClick}
        >
          Activate
        </Button>
      </Typography>
    </Box>
  );
};

export default TwoFactor