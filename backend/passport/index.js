import passport from "passport";

import GoogleStrategy from "./strategies/google.js";

passport.use(GoogleStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
