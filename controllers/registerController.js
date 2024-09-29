import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const registerGetController = (req, res) => {
    return res.status(200).render('register')
}

export const registerPostController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const newUser = new User({
      email,
      password,
      role,
    });
    const userDoc = await newUser.save();
    const { password: pass, ...userData } = userDoc._doc;
    return res.status(201).json(userData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};