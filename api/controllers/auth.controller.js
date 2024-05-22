import User from "../models/user.model.js";
import brcyptjs from "bcryptjs";
import { errorHanlder } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHanlder(401, "User not found"));
    const validPassword = brcyptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHanlder(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // expires the cookie 1 hour
    const expiryDate = new Date(Date.now() + 3600000);
    // remove password to client req
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
