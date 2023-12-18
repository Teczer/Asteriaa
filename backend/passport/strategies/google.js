import { Strategy } from "passport-google-oauth20";

import config from "../../config/index.js";
import User from "../../models/userModel.js";

const GoogleStrategy = new Strategy(
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = new User({
          isEmailVerified: profile.emails[0].value,
          email: profile.emails[0].value,
          googleId: profile.id,
          userName: profile.displayName,
          isAdmin:
            profile.emails[0].value === "mehdi.hattou1@gmail.com" ||
            profile.emails[0].value === "xnessir@gmail.com",
          isEmailVerified: true,
          profilePicture: profile.photos[0].value,
          quizzSystemeSolaire: 1,
          quizzGalaxies: 1,
          quizzPhenomenesObservables: 1,
          quizzAstronautes: 1,
        });

        await user.save();
      }

      if (!user.googleId) {
        user = await User.findOneAndUpdate(
          { email: profile.emails[0].value },
          {
            $set: {
              googleId: profile.id,
              isAdmin:
                profile.emails[0].value === "mehdi.hattou1@gmail.com" ||
                profile.emails[0].value === "xnessir@gmail.com",
            },
          },
          { new: true }
        );
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);

export default GoogleStrategy;
