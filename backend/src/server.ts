// require("dotenv").config();
import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./config/dbConn";
import path from "path";
import errorHandler from "./middleware/errorHandler";
import { logger, logEvents } from "./middleware/logger";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import downloadRoutes from "./routes/downloadRoutes";
import rootRoutes from "./routes/rootRoutes";

//load & run passport middleware(initialize + strategies) for Oauth2/SSO
import "./config/passport";

const app = express();

const PORT = process.env.PORT || 4000; //avoid 5000//used by other services eg linkedin passport
connectDB();

//log req events
app.use(logger);
//parse data/cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Parse cookie header and populate req.cookies */
app.use(cookieParser());
//allow cross origin requests//other origins to req our api//leave black to allow all
//corsOptions= {
//   origin: ["http://localhost:3050"], //can be an array or function for dynamic origins like below
//   credentials: true, //allow setting of cookies etc
//  optionsSuccessStatus: 200;
// }
//if no origin configured, it allows all origins
app.use(cors(corsOptions));

/*-----------------------------------------
 * SERVE STATIC FILES i.e css, images or js files eg files in public or build folder
 ---------------------------*-------------*/
app.use("/", express.static(path.join(__dirname, "public")));
//or app.use(express.static("public"));// = 'public' means ./public

/*-----------------------------------------
 * ROUTES
 ----------------------------------------*/

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/download", downloadRoutes);
/*-----------------------------------------
 * GENERAL ROUTES
 ---------------------------*-------------*/
//---------API HOME/INDEX PAGE ROUTE--------
app.use("/", rootRoutes);

//---------API 404 PAGE----------------
//app works same as .use but go thru all http verbs
//TS is able to infer types of req, and res since we passed the route path
app.all("*", (req, res) => {
  res.status(404);
  /**check accept header to determine response //accept html else json */
  if (req.accepts(".html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

/*-----------------------------------------
 * ERROR HANDLER//MUST BE THE LAST MIDDLEWARE
 ---------------------------*-------------*/
app.use(errorHandler);

/*-----------------------------------------
 * RUN SERVER AND OPEN CONNECTION TO DB
 ---------------------------*-------------*/
//run server only when db is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//log db connection errors
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
