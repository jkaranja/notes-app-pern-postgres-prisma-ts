import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { Strategy as TwitterStrategy } from "@superfaceai/passport-twitter-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";

import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

import express from "express";
import prisma from "./prisma-client";
import { Prisma, Role } from "@prisma/client";

const app = express();

//TS REF
//https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts

//initialize passport to connect with express
app.use(passport.initialize());

//this middleware will be called when passport.authenticate() runs
//google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },

    async (accessToken, refreshToken, profile, cb): Promise<void> => {
      // console.log(accessToken, profile);
      //if no email, fail & redirect to login again//messages not shown tho
      const email = profile.emails?.[0]?.value;

      if (!email) {
        //to trigger failure redirect, err arg must be null and no user arg supplied
        //provide only one arg as null to trigger failure

        return cb(null);
        //below will not trigger failure redirect//it will just return the the error object in empty page
        //it won't trigger success redirect since user arg is null too
        // return cb(
        //   new Error(`Failed! Please choose a different way to sign in`)
        // );
      }

      try {
        //find user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });

        //user doesn't exist, create
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email,
            password: "",
            isVerified: true,
            roles: [Role.USER], //save user as client
          };

          const created = await prisma.user.create({
            data: newUser,
          });

          return cb(null, created);
        } else if (!user.isVerified) {
          //user has account bt not verified//registered using form
          return cb(null);
        } else {
          //user exists, is verified, & is client
          return cb(null, user);
        }
      } catch (error) {
        //if any err occurred, fail
        return cb(null);
      }
    }
  )
);

//fb
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "email"],
      //passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, cb): Promise<void> => {
      // console.log(accessToken, profile);
      //if no email, fail & redirect to login again//messages not shown tho
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return cb(null);
      }

      try {
        //find user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });
        //user doesn't exist, create
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email,
            password: "",
            isVerified: true,
            roles: [Role.USER], //save user as client
          };

          const created = await prisma.user.create({
            data: newUser,
          });

          return cb(null);
        } else if (!user.isVerified) {
          //user has account bt not verified//registered using form
          return cb(null);
        } else {
          //user exists, is verified, & is client
          return cb(null, user);
        }
      } catch (error) {
        //if any err occurred, fail
        return cb(null);
      }
    }
  )
);

//twitter//not working//requires session
passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/twitter/callback`,
      clientType: "confidential",
      //profileFields: ["id", "displayName", "photos", "email"],
      // includeEmail: true,
    },
    async (accessToken, refreshToken, profile, cb): Promise<void> => {
      // console.log(accessToken, profile);
      //if no email, fail
      const email = profile?.emails && profile.emails[0]?.value;

      if (!email) {
        return cb(null);
      }
      try {
        //find user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });
        //user doesn't exist, create
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email,
            password: "",
            isVerified: true,
            roles: [Role.USER], //save user as client
          };

          const created = await prisma.user.create({
            data: newUser,
          });

          return cb(null);
        } else if (!user.isVerified) {
          //user has account bt not verified//registered using form
          return cb(null);
        } else {
          //user exists, is verified, & is client
          return cb(null, user);
        }
      } catch (error) {
        //if any err occurred, fail
        return cb(null);
      }
    }
  )
);

interface StrategyProfile {
  emails: Array<{ value: string }>;
  displayName: string;
}

//github
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: StrategyProfile,
      cb: (err: Error | null, user?: Prisma.UserCreateInput) => void
    ): Promise<void> => {
      // console.log(accessToken, profile);
      //if no email, fail & redirect to login again//messages not shown tho
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return cb(null);
      }

      try {
        //find user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });
        //user doesn't exist, create
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email,
            password: "",
            isVerified: true,
            roles: [Role.USER], //save user as client
          };

          const created = await prisma.user.create({
            data: newUser,
          });

          return cb(null);
        } else if (!user.isVerified) {
          //user has account bt not verified//registered using form
          return cb(null);
        } else {
          //user exists, is verified, & is client
          return cb(null, user);
        }
      } catch (error) {
        //if any err occurred, fail
        return cb(null);
      }
    }
  )
);

//LinkedIn//have to use other port other than 5000//use 4000
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/linkedin/callback`,
      scope: ["r_emailaddress", "r_liteprofile"],
      //state: false, //must to not use session
    },
    async (accessToken, refreshToken, profile, cb): Promise<void> => {
      // console.log(accessToken, profile);
      //if no email, fail & redirect to login again//messages not shown tho
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return cb(null);
      }

      try {
        //find user by email
        const user = await prisma.user.findFirst({
          where: { email },
        });
        //user doesn't exist, create
        if (!user) {
          const newUser = {
            username: profile.displayName,
            email,
            password: "",
            isVerified: true,
            roles: [Role.USER], //save user as client
          };

          const created = await prisma.user.create({
            data: newUser,
          });

          return cb(null);
        } else if (!user.isVerified) {
          //user has account bt not verified//registered using form
          return cb(null);
        } else {
          //user exists, is verified, & is client
          return cb(null, user);
        }
      } catch (error) {
        //if any err occurred, fail
        return cb(null);
      }
    }
  )
);
