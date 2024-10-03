import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const loginGetController = (req, res) => {
  res.status(200).render("login");
};

export const loginPostController = async (req, res) => {
  res.redirect("/");
};
