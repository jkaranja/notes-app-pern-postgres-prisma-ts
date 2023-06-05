import { Stack } from "@mui/system";
import Box from "@mui/system/Box";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import LineChart from "../../components/LineChart";
import DoughnutChart from "../../components/DoughnutChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import AreaChart from "../../components/AreaChart";
import Intro from "../../components/Intro";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CircleIcon from "@mui/icons-material/Circle";
import BarChartIcon from "@mui/icons-material/BarChart";

import UserData from "../../Data";

const Reports = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [chartData, setChartData] = useState(UserData);

  return (
    <Box>
      <Intro>Reports</Intro>
      <Box sx={{}}>
        <Grid container justifyContent="space-between">
          <Grid md>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="card-menu" onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <Menu
                id="card-menu"
                aria-labelledby="card-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect
                </Typography>
              </CardContent>
              <Divider />
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid md sx={{ px: { md: 1 }, my: { md: 0, xs: 1 } }}>
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: 60, height: 60, bgcolor: red[500] }}
                    aria-label="recipe"
                  >
                    <ShoppingCartIcon />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={<Typography variant="body1">Orders</Typography>}
                subheader={<Typography variant="subtitle2">3450</Typography>}
              />
              <Divider />
              <CardActions disableSpacing sx={{ bgcolor: "grey.main" }}>
                <Button
                  sx={{ textTransform: "none" }}
                  color="secondary"
                  endIcon={<ArrowForwardOutlinedIcon />}
                >
                  Orders
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid md>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect
                </Typography>
              </CardContent>
              <Divider />
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          <Grid my={3} container justifyContent="space-between">
            <Grid md={6}>
              <Card>
                <CardHeader
                  action={<></>}
                  title={
                    <Typography
                      variant="body1"
                      color="muted.main"
                      fontWeight="bold"
                    >
                      Sales Overview
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid2 container justifyContent="space-between">
                    <Grid2>
                      <DoughnutChart chartData={chartData} />
                    </Grid2>
                    <Grid2 xs md sx={{ px: { md: 2 } }}>
                      <Grid container justifyContent="space-between" px={4}>
                        <Grid2 xs={12} p={2}>
                          <Box sx={{ display: "flex" }} alignItems="center">
                            <Box mr={2}>
                              <Avatar
                                variant="rounded"
                                sx={{ bgcolor: deepOrange[500] }}
                              >
                                <BarChartIcon fontSize="large" sx={{ mr: 1 }} />
                              </Avatar>
                            </Box>
                            <Box>
                              <Typography variant="h6" color="text.secondary">
                                Number of Sales
                              </Typography>
                              <Typography fontWeight="bold" gutterBottom>
                                $191.02
                              </Typography>
                            </Box>
                          </Box>

                          <Divider />
                        </Grid2>

                        <Grid2 md={6} p={2}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            gutterBottom
                            color="text.secondary"
                          >
                            <CircleIcon
                              color="secondary"
                              sx={{ mr: 1, fontSize: 11 }}
                            />
                            Due
                          </Typography>
                          <Typography fontWeight="bold">$191.02</Typography>
                        </Grid2>
                        <Grid2 p={2}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            gutterBottom
                            color="text.secondary"
                          >
                            <CircleIcon
                              color="secondary"
                              sx={{ mr: 1, fontSize: 11 }}
                            />{" "}
                            Overdue
                          </Typography>
                          <Typography fontWeight="bold">$191.02</Typography>
                        </Grid2>
                        <Grid2 p={2}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            gutterBottom
                            color="text.secondary"
                          >
                            <CircleIcon
                              color="secondary"
                              sx={{ mr: 1, fontSize: 11 }}
                            />{" "}
                            Overdue
                          </Typography>
                          <Typography fontWeight="bold">$191.02</Typography>
                        </Grid2>
                        <Grid2 p={2}>
                          <Typography
                            component="span"
                            variant="subtitle1"
                            gutterBottom
                            color="text.secondary"
                          >
                            <CircleIcon
                              color="secondary"
                              sx={{ mr: 1, fontSize: 11 }}
                            />{" "}
                            Overdue
                          </Typography>
                          <Typography fontWeight="bold">$191.02</Typography>
                        </Grid2>
                      </Grid>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid my={3} container justifyContent="space-between">
            <Grid xs>
              <Card>
                <CardHeader
                  action={
                    <Box>
                      <TextField
                        placeholder="From"
                        color="secondary"
                        size="small"
                        sx={{ mx: 1 }}
                      />

                      <TextField
                        placeholder="To"
                        color="secondary"
                        size="small"
                      />
                    </Box>
                  }
                  title={
                    <Typography variant="body1" fontWeight="bold">
                      Bills and Orders
                    </Typography>
                  }
                />
                <Divider />

                <CardContent>
                  <Grid2 container justifyContent="space-between">
                    <Grid2 xs md sx={{ px: { md: 2 } }}>
                      <Box bgcolor="grey.main" p={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Draft
                        </Typography>
                        <Typography fontWeight="bold">$191.02</Typography>
                      </Box>
                    </Grid2>
                    <Grid2 xs md sx={{ px: { md: 2 } }}>
                      <Box bgcolor="grey.main" p={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Awaiting delivery
                        </Typography>
                        <Typography fontWeight="bold">$191.02</Typography>
                      </Box>
                    </Grid2>
                    <Grid2 xs md sx={{ px: { md: 2 } }}>
                      <Box bgcolor="grey.main" p={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Due
                        </Typography>
                        <Typography fontWeight="bold">$191.02</Typography>
                      </Box>
                    </Grid2>
                    <Grid2 xs md sx={{ px: { md: 2 } }}>
                      <Box bgcolor="grey.main" p={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Overdue
                        </Typography>
                        <Typography fontWeight="bold">$191.02</Typography>
                      </Box>
                    </Grid2>
                  </Grid2>

                  <Box p={3}>
                    <AreaChart chartData={chartData} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid my={3} container justifyContent="space-between">
            <Grid xs>
              <BarChart chartData={chartData} />
            </Grid>
            <Grid xs>
              <LineChart chartData={chartData} />
            </Grid>
            <Grid xs>
              <DoughnutChart chartData={chartData} />
            </Grid>
            <Grid xs>
              <PieChart chartData={chartData} />
            </Grid>
            <Grid xs>
              <AreaChart chartData={chartData} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reports;
