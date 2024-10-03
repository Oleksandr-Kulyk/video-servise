import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

dotenv.config();

const store = new MongoStore({
  clientPromise: mongoose.connection
    .asPromise()
    .then((connection) => connection.getClient()),
  dbName: "video-servise",
});

const sessionConfig = session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    maxAge: 1000 * 60 * 4,
  },
});

export default sessionConfig;
