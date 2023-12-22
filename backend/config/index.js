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
  // MONGODB SECTION
  mongoURI: process.env.MONGO_URI,
  sessionSecretPassword: process.env.SESSION_SECRET_PASSWORD,
  PORT: process.env.PORT,
  // DATABASE SQL SECTION
  databaseUSER: process.env.DATABASE_USER,
  databaseHOST: process.env.DATABASE_HOST,
  databaseNAME: process.env.DATABASE_NAME,
  databasePASSWORD: process.env.DATABASE_PASSWORD,
  databasePORT: process.env.DATABASE_PORT,
  // MAIL
  emailSecretPass: process.env.EMAIL_PASS,
};

export default config;
