import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Badge,
  Chip,
  ListItemSecondaryAction,
  ListSubheader,
  Typography,
} from "@mui/material";

const drawerWidth = 400;

type NotificationDrawerProps = {
  open: boolean;
  handleToggle: () => void;
};

export default function NotificationDrawer({
  open,
  handleToggle,
}: NotificationDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={handleToggle}>
      <Box sx={{ width: drawerWidth, maxHeight: 300, overflow: "auto" }}>
        <List>
          <ListSubheader>
            <Box justifyContent="space-between" sx={{ display: "flex" }}>
              <Typography>Notifications</Typography>
              <Chip
                color="secondary"
                label="6 unread"
                size="small"
                variant="outlined"
              />
            </Box>
          </ListSubheader>
          {[
            "Congratulations flora",
            "New message received",
            " Paypal",
            "Received Order!",
          ].map((text, index) => (
            <ListItem key={text} disablePadding divider>
              <ListItemButton>
                <ListItemIcon>
                  <Badge color="secondary" badgeContent={0} max={999}>
                    <MailIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  secondary="New order received from john"
                />
                <ListItemSecondaryAction>
                  <Typography variant="caption">
                    {index % 2 === 0 ? "Today" : "Jan 4"}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
