import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import { RequestHandler } from "express";
import mongoose from "mongoose";

//HOW IT WILL WORK
//we send refresh token as cookie that can't be read by js//it will be used to send a new access token if it has expired
//on login, we will get a short lived  access token and store in state .ie redux store//it will be lost when we close browser//stored in RAM
//cookies/local stored etc are stored in cache that can be accessed by js unless otherwise
//the access token will be sent in every request and we will verify it
//if it fails with 403 when access token has expired, request new access token using refresh token
//once you get the token, send request again

/*-----------------------------------------------------------
 * LOGIN
 ------------------------------------------------------------*/
interface LoginBody {
  email?: string;
  password?: string;
}

/**
 * @desc - Login
 * @route - POST /auth
 * @access - Public
 */

const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
  req,
  res
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(400).json({ message: "Wrong email or password" });
  }

  if (!foundUser.isVerified) {
    return res.status(400).json({
      message: "Please verify your email first. We sent a link to your email",
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(400).json({ message: "Wrong email or password" });

  //sign access token//payload = user id
  const accessToken = jwt.sign(
    {
      id: foundUser._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "35m" } //expires in 35min//change later to 15
  );

  //sign refresh token
  const refreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "31d" } //expires in 31 days
  );

  // Create secure cookie with refresh token as value
  const day = 24 * 60 * 60 * 1000;
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //can't be accessed by client script via document.cookie//only server//xss won't be able to req new access token if current is stolen
    secure: true, //allow only https//in dev, remove secure part in postman cookie manager//cors handle browser req with credentials=true
    sameSite: "none", //'none' | boolean | 'strict' | 'lax' //cross-site cookie//allow//for csrf, it won't happen since all requests needs an access token too
    maxAge: 31 * day, //31 days//cookie expiry set to match refreshToken
  });

  // Send accessToken containing user id
  res.json({ accessToken });
};

/*-------------------------------------------------------
 * SSO SUCCESSFUL
 --------------------------------------------------------*/
/**
 * @desc - single sign-on
 * @route - POST /auth/sso
 * @access - Public
 */

const oauthSuccess: RequestHandler = (req, res) => {
  //only need this when using passport that defines type for req.user as User which empty
  //somehow, this req from passport above is being intercepted by passport and overriding our req.user type declared using module argumentation
  //for other req objects, our User in declare is able to override passport empty User interface
  interface User {
    _id: mongoose.Types.ObjectId;
  }

  const { _id: id } = req.user as User;

  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "31d",
  });

  // Create secure cookie with refresh token
  const day = 24 * 60 * 60 * 1000;
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 31 * day, // cookie expiry set to match refreshToken
  });

  // Successful authentication, redirect to account.
  //cookie will be set in the browser after redirect// add query parameter to call /refresh route to get access token for this user
  //send encrypted refresh token as query parameter//on frontend//get the token and send it
  res.redirect(`${process.env.OAUTH_SUCCESS_REDIRECT_URL}/?authenticated=true`);
};

/*--------------------------------------------------------
 * CONFIRM EMAIL
 ---------------------------------------------------------*/

interface VerifyEmailParams {
  verifyToken: string;
}

/**
 * @desc - verify
 * @route - POST /auth/verify/:verifyToken
 * @access - Public
 */

const verifyEmail: RequestHandler<
  VerifyEmailParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  //params are part of url, so string
  const { verifyToken } = req.params;

  const verifyEmailToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  const user = await User.findOne({
    verifyEmailToken,
  });

  if (!user) {
    return res.status(400).json({
      message: "Email could not be verified. Please contact support",
    });
  }

  user.isVerified = true;

  user.verifyEmailToken = null; //invalidate token after successful verification

  //if changing email
  if (user.newEmail) {
    user.email = user.newEmail;
    user.newEmail = ""; //clear new email field
  }

  await user.save();
  return res.status(201).json({ message: "Email verified" });
};

/*--------------------------------------------------------
 * FORGOT PASSWORD
 ---------------------------------------------------------*/
/**
 * @desc - forgot password
 * @route - POST api/auth/forgot
 * @access - Public
 */

const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(400).json({ message: "Email could not be sent" });
  }

  //will give as 20 characters//hex is 16 numbers 0-9 then a-f
  const resetToken = crypto.randomBytes(20).toString("hex");

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetPasswordToken;

  user.resetPasswordTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; //expire in 24 hrs

  //send email//then use match.params.resetToken to get the token
  const emailOptions = {
    subject: "Reset your password",
    to: user.email,
    body: `
                <p>Hi ${user.username}, </p>
                <p>A request to reset your password has been made. If you did not make this request, ignore this email. If you did make the request, please click the button below to reset your password:</p>
                <a href ='${process.env.RESET_PWD_URL}/${resetToken}' target='_blank' style='display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 15px 0px; padding: 5px 15px; text-transform: capitalize; border-color: #3498db;'>Reset password
                </a>  
                <p><small>This link will expire in 24 hours</small> </p>              
                `,
  };
  const response = await sendEmail(emailOptions);

  if (!response) {
    return res.status(400).json({ message: "Email could not be sent" });
  }

  await user.save();

  res
    .status(200)
    .json({ message: "We've sent a password recovery link to your email" });
};

/*--------------------------------------------------------
 * RESET PASSWORD
 ---------------------------------------------------------*/
/**
 * @desc - Reset
 * @route - POST /auth/reset/:resetToken
 * @access - Public
 */

const resetPassword: RequestHandler = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }

  const token = crypto.createHash("sha256").update(resetToken).digest("hex");

  // const user = await User.findOne({
  //   resetPasswordToken: { token, expiresIn: { $gt: Date.now() } },
  // });

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Password could not be reset" });
  }

  user.resetPasswordToken = null;

  user.password = await bcrypt.hash(password, 10);

  await user.save();
  return res.json({
    message: "Password reset successfully. Please log in",
  });
};

/*--------------------------------------------------------
 * REFRESH TOKEN//GET NEW ACCESS TOKEN
 ---------------------------------------------------------*/

/**
 * @desc - Refresh
 * @route - GET /auth/refresh
 * @access - Public
 */

const refresh: RequestHandler = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(403).json({ message: "Forbidden" });

  const refreshToken: string = cookies.jwt; //cookies.jwt is of any type//must be converted to string for err & decoded types to be inferred
  //else you must pass type: err: VerifyErrors | null,  decoded: JwtPayload | string | undefined

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(
        (<{ id: string }>decoded).id
      ).exec();

      if (!foundUser) return res.status(403).json({ message: "Forbidden" });

      const accessToken = jwt.sign(
        {
          id: foundUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

/*--------------------------------------------------------
 * LOGOUT//CLEAR REFRESH TOKEN COOKIE
 ---------------------------------------------------------*/

/**
 * @desc - Logout
 * @route - POST api/auth/logout
 * @access - Public
 *
 */
const logout: RequestHandler = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    //return res.sendStatus(204); //No content// sendStatus is same as res.status(204).send('No content')
    //204 don't have response body
    ////sendStatus sets res http status code and sends the status code string representation as res body
    return res.status(200).json({ message: "Logged out" });
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Logged out" });
};

export {
  login,
  refresh,
  logout,
  oauthSuccess,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
