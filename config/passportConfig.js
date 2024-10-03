import User from "../models/user.js";

export const serialize = (user, done) => {
  return done(null, user._id);
};

export const deserialize = async (id, done) => {
  const userDoc = await User.findById(id);
  const { password, ...userData } = userDoc._doc;
  return done(null, userData);
};
