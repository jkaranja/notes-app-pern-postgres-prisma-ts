import React from "react";

import { Button, Grid, Typography, Box, Chip, Switch } from "@mui/material";

import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Pricing = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h3" gutterBottom>
        Pricing Plans
      </Typography>
      <Typography gutterBottom>
        All plans include 40+ advanced tools and features to boost your product.
        Choose the best plan to fit your needs.
      </Typography>
      <Box py={4}>
        <Typography component="span">Monthly</Typography>
        <Switch
          size="small"
          color="secondary"
          // checked={checked}
          // onChange={handleChange}
        />
        <Typography component="span">Annually</Typography>
      </Box>
      <Box textAlign="left" my={8}>
        <Grid2
          container
          justifyContent="center"
          spacing={2}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            px: 2,
          }}
        >
          {[
            { type: "basic", budget: 0 },
            { type: "standard", budget: 99 },
            { type: "enterprise", budget: 499 },
          ].map(({ type, budget }) => (
            <Grid2 md={4} lg={3} xl={2.5} py={2}>
              <Card key={type} variant="outlined" sx={{ p: 2, mr: 1 }}>
                <CardHeader
                  action={
                    <Chip
                      color="secondary"
                      label="popular"
                      size="small"
                      variant="outlined"
                    />
                  }
                />

                <CardMedia sx={{}} image="plans.png" title="green iguana" />
                <Typography
                  variant="h5"
                  align="center"
                  fontWeight="bold"
                  mt={3}
                  textTransform="capitalize"
                >
                  {type}
                </Typography>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    gutterBottom
                  >
                    A simple start for start ups & Students
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="secondary"
                    align="center"
                    my={3}
                  >
                    ${budget}
                    <Typography variant="caption" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  {[...Array(5)].map(() => (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      gutterBottom
                      paragraph
                      my={3}
                    >
                      <PanoramaFishEyeIcon sx={{ mr: 2, fontSize: 11 }} />
                      100 responses a month
                    </Typography>
                  ))}
                </CardContent>
                <CardActions sx={{ display: "block" }}>
                  <Button variant="outlined" color="secondary" fullWidth>
                    Upgrade
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Pricing;
