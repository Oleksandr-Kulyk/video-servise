import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const loginGetController = (req, res) => {
  res.status(200).render("login");
};

export const loginPostController = async (req, res) => {
  if (req.session.returnTo) {
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(returnTo);
  }
};
