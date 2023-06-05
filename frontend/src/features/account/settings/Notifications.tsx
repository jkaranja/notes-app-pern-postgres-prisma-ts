import { Box, List, ListItem, ListItemText, Paper, Switch, Typography } from '@mui/material';
import React from 'react'
import { User } from '../../../types/user';

type NotificationsProps = {
  user: User;
};


const Notifications = ({ user }: NotificationsProps) => {
  return (
    <Box component={Paper} p={3}>
      <Typography variant="h6" gutterBottom mb={3}>
        Notifications
      </Typography>
      <List>
        <Typography variant="h6" gutterBottom pt={3} px={2}>
          Email Notifications
        </Typography>
        {/* <ListSubheader>Email Notifications</ListSubheader> */}

        {[...Array(5)].map((item, i) => {
          return (
            <ListItem divider={i !== 4} dense>
              <ListItemText primary="Your email" secondary="hello" />
              <Switch edge="start" defaultChecked />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Notifications