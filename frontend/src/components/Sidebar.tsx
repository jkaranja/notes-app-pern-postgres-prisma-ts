import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";


type SidebarProps = {
  sidebarOpen: boolean;
  handleSidebarToggle: ()=>void;
  sidebarWidth: number;
};


const Sidebar = ({
  sidebarOpen,
  handleSidebarToggle,
  sidebarWidth,
}: SidebarProps) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  ///drawer content//used in both mobile and desktop sizes drawers
  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex" }} py={2} px={3}>
        <Typography
          component="span"
          variant="h4"
          sx={{
            flex: 1,
            textDecoration: "none",
            color: "rgb(198, 167, 254)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          MUI
        </Typography>
        <IconButton
          onClick={handleSidebarToggle}
          sx={{ display: { md: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Accordion defaultExpanded disableGutters elevation={0} square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "rgba(231, 227, 252)" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="listItem-active"
        >
          <InboxIcon sx={{ color: "rgba(231, 227, 252, 0.87)" }} />

          <Typography sx={{ px: 1 }}>Manage orders</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          {/* <Divider /> */}
          <List
            sx={{
              py: 0,
              bgcolor: "rgba(36, 33, 69, 0.94)",
            }}
          >
            {[...Array(3)].map((text, index) => (
              <>
                {/* divider={text !== "Orders"} */}
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    bgcolor:
                      pathname === "/notes/new"
                        ? "rgba(231, 227, 252, 0.08)"
                        : "",
                  }}
                >
                  <ListItemButton onClick={() => navigate("/notes/new")}>
                    {/* <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText
                      secondaryTypographyProps={{
                        sx: { color: "rgba(231, 227, 252)" },
                      }}
                      sx={{ pl: 2 }}
                      secondary="Post note"
                    />

                    <Avatar
                      sx={{
                        fontSize: 14,
                        width: "auto",
                        height: "auto",
                        bgcolor: "transparent",
                      }}
                    >
                      (3)
                    </Avatar>
                  </ListItemButton>
                </ListItem>
              </>
            ))}
            <ListItem
              disablePadding
              onClick={() => navigate("/notes")}
              sx={{
                bgcolor:
                  pathname === "/notes" ? "rgba(231, 227, 252, 0.08)" : "",
              }}
            >
              <ListItemButton>
                <ListItemText
                  sx={{ pl: 2 }}
                  secondary="Notes"
                  secondaryTypographyProps={{
                    sx: {
                      color: "rgba(231, 227, 252)",
                    },
                  }}
                />
                <Avatar
                  sx={{
                    fontSize: 14,
                    width: "auto",
                    height: "auto",
                    bgcolor: "transparent",
                  }}
                >
                  3
                </Avatar>
              </ListItemButton>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      {/* <Divider /> */}
      <List sx={{ py: 0 }}>
        {["Messages", "Manage users", "Reports"].map((text, index) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate("/reports")}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {index % 2 === 0 ? (
                    <InboxIcon sx={{ color: "rgba(231, 227, 252, 0.87)" }} />
                  ) : (
                    <MailIcon sx={{ color: "rgba(231, 227, 252, 0.87)" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={<Typography>{text}</Typography>} />
              </ListItemButton>
            </ListItem>
            {/* <Divider /> */}
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* toggle-able mobile drawer// display only from md and down(display ensure drawer hides in case open={true} & size goes past md up//false/closed by default//toggle with btn to show  . */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={handleSidebarToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* initial sidebar/drawer// permanent & persistent don't elevate drawer//display only from md up */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
        open
        PaperProps={{
          sx: {
            bgcolor: "rgba(36, 33, 69, 1)",
            color: "rgba(231, 227, 252, 0.87)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
