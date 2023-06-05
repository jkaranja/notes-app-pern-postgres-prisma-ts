import { Divider, Fab, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

export const Footer = () => {
  //will return true if you cross 100px from top
  const trigger = useScrollTrigger({
    disableHysteresis: true, //required//if not added/false, trigger is only true when you scroll down and false when up
    threshold: 100, //default is 100px//detect when you scroll down and hit min of 100 from top//becomes true
  });
  //on click get the anchor id(see id in navbar), scroll up and put it into viewport
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const anchor = (
      (event.target as HTMLElement).ownerDocument || document
    ).querySelector(".back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };
  //below, Fade children component must not be a Fab/btn //box working

  return (
    <Box className="footer-wrapper" color="white">
      <Grid2
        container
        justifyContent="center"
        minHeight={250}
        textAlign="center"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          py: { md: 15, xs: 8 },
          px: 2,
        }}
      >
        <Grid2 md={2} py={2}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Typography>Contact</Typography>
          <Typography>Help Center</Typography>
          <Typography>Site Map</Typography>
        </Grid2>
        <Grid2 md={2} py={2}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Typography>About Us </Typography>
          <Typography>Careers</Typography>
          <Typography>Newsroom</Typography>
        </Grid2>
        <Grid2 md={2} py={2}>
          <Typography variant="h6" gutterBottom>
            Community
          </Typography>
          <Typography>Partner with Pluralsight </Typography>
          <Typography>Affiliate Partners</Typography>
          <Typography>Site Map</Typography>
        </Grid2>
      </Grid2>
      <Divider sx={{ borderColor: "#404376" }} />
      <Box textAlign="center" pt={3} pb={3}>
        <Typography
          variant="caption"
          component="span"
          style={{ fontSize: 12, marginRight: 20 }}
        >
          @{new Date().getFullYear()} All rights reserved
        </Typography>

        <Link
          to="/terms"
          style={{ fontSize: 12, marginLeft: 20, color: "#d32f2f" }}
        >
          Terms of use
        </Link>
        <Link
          to="/terms"
          style={{ fontSize: 12, marginLeft: 20, color: "#d32f2f" }}
        >
          Privacy Notice
        </Link>
      </Box>
      <Box textAlign="center">
        <Typography variant="caption">
          Contact us via email: mui@mui.com, phone: +123, 456, 780
        </Typography>
      </Box>

      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Fab size="medium" color="error" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Fade>
    </Box>
  );
};
