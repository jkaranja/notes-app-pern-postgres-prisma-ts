import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StarIcon from "@mui/icons-material/Star";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import Swiper core and required modules
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

//animated numbers//count up
import ScrollTrigger from "react-scroll-trigger";

import { useSpring, animated } from "react-spring";

import { Link } from "react-router-dom";
import CustomStepper from "../components/CustomStepper";
//animated numbers component

const CountUp = ({ n }: { n: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: {
      friction: 10,
      tension: 20,
      mass: 1,
    },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};

//https://github.com/michalsnik/aos
//https://www.npmjs.com/package/aos
//https://preview.colorlib.com/#direngine

//

const Home = (): JSX.Element => {
  //trigger animated numbers
  const [counterOn, setCounterOn] = useState(false); //type is inferred = boolean
  //password

  //form
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [name, setName] = useState<string | null>(null);
  //can also apply types to event handler itself instead of arg
  // ChangeEventHandler can also be the general FormEvent->event when form element gets/loses focus, a form element value is changed or the form is submitted.
  //if event handler is used inline, no typing is needed
  //event for change would be e: React.ChangeEvent<HTMLInputElement>
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

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
    <>
      <Box className="hero-wrap">
        <Grid2
          container
          justifyContent="space-around"
          color="white"
          py={10}
          sx={{ flexDirection: { xs: "column", md: "row" }, px: 2 }}
        >
          <Grid2 xs md={6} pt={6}>
            <Typography variant="h3" gutterBottom>
              Modern web application generators
            </Typography>
            <Typography variant="body1" gutterBottom paragraph>
              Develop critical tech skills. Cut cycle times. Build happier,
              healthier tech teams. And transform your goals into gains. All
              with Pluralsight.
            </Typography>
            <Box my={8}>
              <Button variant="contained" color="error" size="large">
                View plans
              </Button>
              <Typography variant="caption" gutterBottom paragraph py={3}>
                * Want a detailed guide on how to create content that serves the
                funnel? Grab my 32-page strategy overview to find out — no
                strings attached.
              </Typography>
            </Box>
          </Grid2>
          <Grid2
            xs
            md={3}
            sx={{ position: "relative", bottom: { md: -80 }, zIndex: 1 }}
          >
            <Card sx={{ px: 2, py: 2 }} variant="outlined">
              <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {}}>
                <CardHeader
                  // title={
                  //   <Typography variant="h4" gutterBottom>
                  //     Welcome back
                  //   </Typography>
                  // }
                  subheader="Please sign up below"
                />
                <CardContent>
                  <FormGroup>
                    <TextField
                      required
                      id="outlined-basic"
                      label="Username"
                      margin="dense"
                      //name//as norm text
                      value={name || ""}
                      onChange={handleChange}
                      color="secondary"
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      required
                      id="outlined-basic"
                      label="Email"
                      margin="dense"
                      //name//as norm text
                      // value={name}
                      // onChange={handleChange}
                      color="secondary"
                    />
                  </FormGroup>

                  {/* ----------pass------------ */}
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    margin="dense"
                    label="Password"
                    //name//as norm text
                    // value={name}
                    // onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid2
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormGroup sx={{ fontSize: "12px" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            color="secondary"
                            // checked={checked}
                            // onChange={handleChange}
                          />
                        }
                        label={
                          <Typography
                            variant="body2"
                            sx={{ color: "muted.main" }}
                          >
                            I agree to privacy policy & terms
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Grid2>

                  <Button
                    type="submit"
                    size="large"
                    sx={{ mt: 2 }}
                    variant="contained"
                    fullWidth
                    color="secondary"
                  >
                    Sign up
                  </Button>
                  <Typography
                    variant="body2"
                    mt={3}
                    sx={{ color: "muted.main" }}
                  >
                    Already have an account?? <Link to="/login">Log in</Link>
                  </Typography>

                  <Divider sx={{ pt: 2 }}> or </Divider>
                </CardContent>
                <CardActions sx={{ display: "block", textAlign: "center" }}>
                  <IconButton>
                    <GoogleIcon sx={{ color: "error.main" }} />
                  </IconButton>
                  <IconButton>
                    <FacebookIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </CardActions>
              </form>
            </Card>
          </Grid2>
        </Grid2>

        <Box className="custom-bottom-svg">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </Box>
      </Box>

      <Grid2
        container
        justifyContent="space-evenly"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          py: { md: 15, xs: 8 },
          px: 2,
        }}
      >
        <Grid2 xs py={2} md={4} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            Why Pluralsight?
          </Typography>
          <Typography>
            Whether you’re an individual looking to learn Python to advance your
            career or an enterprise team looking to cut cycle times, speed up
            onboarding, or give your teams the skills to realize your
            strategies, we remove the challenges and roadblocks slowing you
            down. We’re advancing the world’s tech workforce, and that starts
            with making your work more efficient and effective—and giving you
            more to celebrate.
          </Typography>
          <Typography gutterBottom my={4}>
            <Button
              size="large"
              variant="contained"
              color="error"
              sx={{ borderRadius: 10 }}
            >
              See all solutions
            </Button>
          </Typography>
        </Grid2>
        <Grid2 xs py={2} md={4} data-aos="fade-up">
          <img width="80%" src="why-us.svg" alt="why us" />
        </Grid2>
      </Grid2>

      <Box bgcolor="grey.main" py={15}>
        <Box>
          <Typography variant="h3" gutterBottom align="center" py={4}>
            Three steps to your next perfect hire
          </Typography>
        </Box>
        <Box>
          <CustomStepper />
        </Box>
      </Box>

      <Box py={15}>
        <Box textAlign="center" px={2}>
          <Typography variant="h3" gutterBottom>
            Our top features
          </Typography>
          <Typography gutterBottom>
            Finding great developers shouldn't be hard. We make it easy by
            taking care of the time-consuming parts for you.
          </Typography>
        </Box>
        <Box>
          <Grid2
            container
            justifyContent="space-evenly"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              py: 8,
              px: 2,
            }}
          >
            {[...Array(4)].map((feature, i) => (
              <Grid2 md={2.5} data-aos="fade-up" py={2} key={i}>
                <Typography variant="h6">
                  <IconButton
                    color="secondary"
                    disabled
                    sx={{ background: "#f0f1fd" }}
                  >
                    <DashboardIcon color="secondary" />
                  </IconButton>
                  Dashboard
                </Typography>
                <Typography>
                  Whether you’re an individual looking to learn Python to
                  advance your career or an enterprise team looking to cut cycle
                  times, speed up onboarding, or give your teams the skills to
                  realize your strategies, we remove the challenges and
                  roadblocks slowing you down. We’re advancing the world’s tech
                  workforce, and that starts with making your work more
                  efficient and effective—and giving you more to celebrate.
                </Typography>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Box>
          <Typography gutterBottom my={4} align="center">
            <Button variant="contained" color="error">
              See all features
            </Button>
          </Typography>
        </Box>
      </Box>

      <Grid2
        container
        justifyContent="center"
        bgcolor="secondary.main"
        color="white"
        textAlign="center"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          py: { md: 15, xs: 8 },
          px: 2,
        }}
      >
        <Grid2 md={3} data-aos="fade-up" py={2}>
          <ScrollTrigger
            onEnter={() => setCounterOn(true)}
            onExit={() => setCounterOn(false)}
          />
          <Typography variant="h4" gutterBottom>
            {counterOn && <CountUp n={100} />}
          </Typography>
          <Typography>Happy Customers</Typography>
        </Grid2>
        <Grid2 md={3} data-aos="fade-up" py={2}>
          <Typography variant="h4" gutterBottom>
            {counterOn && <CountUp n={500} />}
          </Typography>
          <Typography>Happy Customers</Typography>
        </Grid2>
        <Grid2 md={3} data-aos="fade-up" py={2}>
          <Typography variant="h4" gutterBottom>
            {counterOn && <CountUp n={1000} />}
          </Typography>
          <Typography>Happy Customers</Typography>
        </Grid2>
      </Grid2>

      <Box py={15} className="testimonial-wrapper">
        <Box>
          <Typography variant="h3" gutterBottom align="center">
            Testimonial
          </Typography>
        </Box>
        <Box data-aos="fade-up">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            slidesPerView={1}
            loop
            navigation
            speed={300}
            effect={"fade"}
            autoplay
            pagination={{ clickable: true }}
            id="swiper-wrapper"
          >
            {[...Array(3)].map((slide, j) => (
              <SwiperSlide className="swiper-slide" key={j}>
                <Grid2 container justifyContent="space-evenly">
                  {[...Array(3)].map((card, i) => (
                    <Grid2 md={3} data-aos="fade-up" key={i}>
                      <Card sx={{ minHeight: 250, m: 1 }}>
                        <CardHeader
                          avatar={<Avatar sx={{ height: 40, width: 40 }} />}
                          title="Glaira"
                          subheader="Social Media Manager"
                        />
                        <CardContent sx={{ py: 1 }}>
                          <Typography py={0}>
                            Copy.ai is THE best!!! Been using it for copywriting
                            especially for blog posts.
                            <Typography
                              color="warning.main"
                              component="span"
                              px={1}
                            >
                              Saves me so much time and mental energy.{" "}
                            </Typography>{" "}
                            It's a worthwhile investment!
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Typography variant="caption">
                            {[...Array(5)].map((icon) => (
                              <StarIcon color="warning" sx={{ fontSize: 20 }} />
                            ))}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box>
          <Typography gutterBottom my={4} align="center">
            <Button variant="contained" color="error">
              See all features
            </Button>
          </Typography>
        </Box>
      </Box>

      <Box className="skewed-wrapper" bgcolor="error.main">
        <Box
          className="skewed-block"
          sx={{ display: { md: "block", xs: "none" } }}
        >
          <Box className="skewed-block-img"></Box>
        </Box>
        <Box
          className="skewed-content-block"
          sx={{ width: { md: "50%", xs: "100%" } }}
        >
          <Typography variant="h3" gutterBottom>
            Your Words Must Save
          </Typography>
          <Typography>
            Aaron navigates the delicate balance of creating content like a
            writer and delivering business value like a strategist.
          </Typography>
        </Box>
      </Box>

      <Box py={10} textAlign="center">
        <Typography variant="h3">FAQ</Typography>
        <Grid2 container justifyContent="center">
          <Grid2 md={6} data-aos="fade-up">
            <Accordion disableGutters elevation={0} square>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Where can I learn more about copywriting or entrepreneurship?
                  Check out our blog!
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We have copywriting tools for everything you need to start and
                  run your business! You can write blog posts, product
                  descriptions, and even Instagram captions with Copy.ai. We're
                  always updating our tools, so let us know what else you'd like
                  to see!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>What languages does it support?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We have copywriting tools for everything you need to start and
                  run your business! You can write blog posts, product
                  descriptions, and even Instagram captions with Copy.ai. We're
                  always updating our tools, so let us know what else you'd like
                  to see!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>What languages does it support?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We have copywriting tools for everything you need to start and
                  run your business! You can write blog posts, product
                  descriptions, and even Instagram captions with Copy.ai. We're
                  always updating our tools, so let us know what else you'd like
                  to see!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default Home;
