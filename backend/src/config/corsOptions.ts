import allowedOrigins from "./allowedOrigins";

//allow from postman as //origin is undefined//change in production
type CustomOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin) => void) => void;
type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[]; //handles type for origin as array

interface CorsOptions {
  origin?: StaticOrigin | CustomOrigin | undefined;
 credentials?: boolean | undefined;
 optionsSuccessStatus?: number | undefined;
}


const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, //allow browser to set cookies for our responses etc
  optionsSuccessStatus: 200,
};

export default corsOptions;
