import Container from "@mui/material/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { purple } from "@mui/material/colors";

import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TwoFactor from "./pages/TwoFactor";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";

import Login from "./features/auth/Login";
import Forgot from "./features/auth/Forgot";
import Reset from "./features/auth/Reset";
import VerifyingEmail from "./features/auth/VerifyingEmail";
import RequireAuth from "./features/auth/RequireAuth";

import Signup from "./features/user/Signup";
import VerifyEmail from "./features/user/VerifyEmail";

import Reports from "./features/reports/Reports";

import NoteList from "./features/notes/NoteList";
import EditNote from "./features/notes/EditNote";
import PostNote from "./features/notes/PostNote";
import ViewNote from "./features/notes/ViewNote";

import Settings from "./features/account/settings/Settings";
import Wallet from "./features/account/Wallet";
import Prefetch from "./features/auth/Prefetch";
import { themeSettings } from "./theme";
import OauthFailureRedirect from "./pages/OauthFailureRedirect";

function App() {

const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

const theme = themeSettings(prefersDarkMode);
  
  
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {/* //fluid sets width to 100% in BStrap//here maxWidth is used //default is maxWidth="md" not full width//
      //set maxWidth={false} to have 100% width// can also have sm - xl//not 100%// 
      //disableGutters removes px padding. 
      //put all your components inside Router/BrowserRouter to use router dom hooks in them//Routes only has <route /> children */}
      <Router>
        <Container maxWidth={false} disableGutters>
          <Routes>
            <Route path="/">
              {/* public routes */}
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="features" element={<Features />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot" element={<Forgot />} />
                <Route path="reset/:token" element={<Reset />} />
                <Route path="verify" element={<VerifyEmail />} />
                <Route path="verifying/:token" element={<VerifyingEmail />} />
                <Route path="two-factor" element={<TwoFactor />} />
                <Route
                  path="oauth/failure"
                  element={<OauthFailureRedirect />}
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<RequireAuth />}>
                <Route element={<Prefetch />}>
                  <Route element={<DashLayout />}>
                    <Route path="reports" element={<Reports />} />
                    <Route path="notes">
                      <Route index element={<NoteList />} />
                      <Route path="edit/:id" element={<EditNote />} />
                      <Route path="new" element={<PostNote />} />
                      <Route path="view/:id" element={<ViewNote />} />
                      <Route path="search?q=''&page=1" element={<ViewNote />} />
                    </Route>
                    <Route path="account">
                      <Route index element={<Settings />} />
                      <Route path="wallet" element={<Wallet />} />
                    </Route>
                  </Route>
                  {/* End Dash */}
                </Route>
              </Route>
              {/* End Protected Routes */}
            </Route>
          </Routes>
        </Container>
      </Router>
      <ToastContainer
        theme="dark"
        autoClose={5000} //toggle progress bar
        //hideProgressBar={false}
        pauseOnHover
        closeOnClick //disabled autoClose
        draggable
      />
    </ThemeProvider>
  );
}

export default App;
