import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useScrollTrigger,
} from "@mui/material";
import { ContentCut } from "@mui/icons-material";
import { purple } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

//ALternative to this responsive component behaves is to have links change into icons
//good for dashboard nav// while main nav is hidden when loggged in
//another is to make it responsive using a menu instead of drawer
//All of them are using display: { xs: "none", sm: "block" } and vice versa to hide and show
//and hide/ swap// you will have two menus//one to start with//other in the drawer/menu/icons
//the toggle btn//menu toggler is using display: { sm: "none" }//hidden from sm and up//visible
//from sm and down

function Header() {
  const trigger = useScrollTrigger({
    disableHysteresis: true, //required//if not added/false, trigger is only true when you scroll down and false when up
    threshold: 20, //default is 100px//detect when you scroll down and hit min of 100 from top//becomes true
  });

  const { pathname } = useLocation();

  const navigate = useNavigate();

  /**------------------------------------
 * PAGES
 ----------------------------------*/
  const pages = [
    "Features",
    "Pricing",
    "About",
    "Contact",
    "Login",
    "Signup",
    "notes/new",
  ];
  //the drawer responsiveness is relying on sx = {{display:{sm: "none"/block}}} //i.e hide and show

  //drawer
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box>
      <Box sx={{ display: "flex" }} py={2} px={4}>
        <Typography
          component="span"
          variant="h4"
          sx={{ flex: 1, textDecoration: "none", cursor: "pointer" }}
          onClick={() => navigate("/")}
          
        >
          MUI
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem
            key={page}
            disablePadding
            onClick={() => navigate(`/${page.toLowerCase()}`)}
          >
            <ListItemButton sx={{ px: 4 }}>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex" }}
      id="nav-bar"
      className={trigger || pathname !== "/" ? "active" : ""}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        elevation={pathname !== "/" ? 4 : 0}
        position="sticky"
        color="transparent"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="span"
            variant="h4"
            sx={{
              mr: "auto",
              color: "white",
              display: { xs: "none", md: "block", textDecoration: "none", cursor: "pointer" },
            }}
            onClick={() => navigate("/")}
          >
            MUI
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
                sx={{ color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Header;
