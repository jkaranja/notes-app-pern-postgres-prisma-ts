import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";

import path from "path";
import { RequestHandler } from "express";

//function for logging all requests and errors to our files
//custom logger//you can also use winston package for console(like morgan) + file logging
//https://www.npmjs.com/package/winston

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

/**logs all requests//put conditions to only log request coming from other origins//will get full fast */
const logger: RequestHandler = (req, res, next) => {
  //    req.headers.origin//where req came from//if not browser eg postman, origin is undefined
  //    req.headers.host//where was sent to
  //.url = same as .path eg /login
  //change this when going to production//allow only if not your own origin
  (!req.headers.origin || req.headers.origin !== "http://localhost: 3000") &&
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

  //   console.log(`${req.method} ${JSON.stringify(req.path)}`);
  next();
};

export { logEvents, logger };
