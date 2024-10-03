import { Strategy as localStrategy } from "passport-local";
import User from "../models/user.js";

const configureLocalStrategy = () => {
  return new localStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
          return done(null, false);
        }
        if (!(await userDoc.verifyPassword)) {
          return done(null, false);
        }
        return done(null, userDoc);
      } catch (error) {
        return done(error, false);
      }
    }
  );
};

export default configureLocalStrategy;
