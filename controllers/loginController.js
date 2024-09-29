import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";



export const loginGetController = (req, res) => {
  res.status(200).render("login");
};

export const loginPostController = async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "wrong email or password" });
    }

    if ( ! await user.verifyPassword(pass)) {
      return res.status(404).json({ message: "wrong email or password" });
    }
    res.cookie("user", JSON.stringify({ id: user._id, email }), {
      maxAge: 1000 * 60 * 2,
      httpOnly: true,
    });
    res.status(303).redirect("/");
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
