declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";

      PORT: string | number;

      MONGO_URI: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      RESEND_EMAIL_TOKEN_SECRET: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      SMTP_HOST: string;

      BASE_URL: string;

      VERIFY_EMAIL_URL: string;

      RESET_PWD_URL: string;

      OAUTH_SUCCESS_REDIRECT_URL: string;

      OAUTH_FAILURE_REDIRECT_URL: string;

      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;

      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;

      LINKEDIN_CLIENT_ID: string;
      LINKEDIN_CLIENT_SECRET: string;

      CLOUD_NAME: string;
      CLOUD_API_KEY: string;
      CLOUD_API_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
