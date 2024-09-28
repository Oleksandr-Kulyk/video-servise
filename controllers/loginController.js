import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";

/* export const registerController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hash,
      role,
    });
    const userDoc = await newUser.save();
    const { password: pass, ...userData } = userDoc._doc;
    return res.status(201).json(userData);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}; */

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
    const result = bcrypt.compare(pass, user.password);
    if (!result) {
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
