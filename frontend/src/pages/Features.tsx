import { Button, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Layout from "../components/Layout";
import AOS from "aos";
import "aos/dist/aos.css";

const Features = () => {
  //animation on scroll
  useEffect(() => {
    AOS.init({
      // Global settings:
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  }, []);
  return (
    <Box textAlign="center">
      <Typography variant="h3">Useful Features</Typography>
      <Typography gutterBottom>
        Salient features that makes Materio stand out
      </Typography>
      <Box textAlign="left" my={8}>
        <Grid2
          container
          justifyContent="space-between"
         
          sx={{ px: { md: 2 } }}
        >
          {[...Array(6)].map((feature, i) => (
            <Grid2 md={5} lg={4} data-aos="fade-up" key={i} py={2}>
              <Box sx={{ display: "flex" }} justifyContent="space-between">
                <DashboardIcon color="secondary" sx={{ fontSize: 50, mx: 3 }} />
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={400}>
                    Dashboard
                  </Typography>
                  <Typography>
                    Whether you’re an individual looking to learn Python to
                    advance your career or an enterprise team looking to cut
                    cycle times, speed up onboarding, or give your teams the
                    skills to realize your strategies, we remove the challenges
                    and roadblocks slowing you down.
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Button variant="contained" color="error">
        See all features
      </Button>
    </Box>
  );
};

export default Features;
