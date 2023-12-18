import dotenv from "dotenv";

dotenv.config();

const config = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL_API}/auth/google/callback`,
  },
  frontURL: process.env.FRONTEND_URL,
  serverURL: process.env.SERVER_URL_API,
  mongoURI: process.env.MONGO_URI,
  sessionSecretPassword: process.env.SESSION_SECRET_PASSWORD,
  PORT: process.env.PORT,
};

export default config;
