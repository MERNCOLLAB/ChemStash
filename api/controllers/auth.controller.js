import User from "../models/user.model.js";
import brcyptjs from "bcryptjs";
// Sign up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = brcyptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User create successfully" });
  } catch (error) {
    next(error);
  }
};
