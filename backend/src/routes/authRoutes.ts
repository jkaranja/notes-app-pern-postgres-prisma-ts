import express from "express";
import passport from "passport";
const router = express.Router();
import * as authController from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";
import requestLimiter from "../middleware/requestLimiter";

/*-----------------------------------------
 * login
 ----------------------------------------*/
/*-----------------------------------------
 * EMAIL & PWD
 ----------------------------------------*/
router.post("/login", loginLimiter, authController.login);

/*-----------------------------------------
 * SINGLE SIGN-ON/SSO/OAUTH2
 ----------------------------------------*/
//---------google---------
router.get(
  "/sso/google",
  loginLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/sso/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL,
    // successRedirect: "/protected",
    // failureMessage: true, sent as to req.messages to login page
    session: false, //disable session//else error if not using express-session
  }),
  
  authController.oauthSuccess

  // function (req, res) {
  //   res.json({ user: req.user });

  //   console.log(req.user);
  //   // Successful authentication, redirect to account.
  //   // res.redirect("/");
  // }
);

//----------------fb-----------
router.get(
  "/sso/facebook",
  loginLimiter,
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/sso/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL,
    session: false,
  }),
  authController.oauthSuccess
);

//----------twitter-require session support//not working-----------------
router.get("/sso/twitter", loginLimiter, passport.authenticate("twitter"));

router.get(
  "/sso/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL,
    session: false,
  }),
  authController.oauthSuccess
);

//-------------github-----------------------
router.get(
  "/sso/github",
  loginLimiter,
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/sso/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL,
    session: false,
  }),
  authController.oauthSuccess
);

//-----------------linkedin-------------
router.get("/sso/linkedin", loginLimiter, passport.authenticate("linkedin"));
router.get(
  "/sso/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL,
    session: false,
  }),
  authController.oauthSuccess
);

/*-----------------------------------------
 * others
 ----------------------------------------*/

router.route("/refresh").get(authController.refresh);

router.route("/verify/:verifyToken").post(authController.verifyEmail);


router.route("/forgot").post(requestLimiter, authController.forgotPassword);

router.route("/reset/:resetToken").post(authController.resetPassword);

router.route("/logout").post(authController.logout);

export default router;
