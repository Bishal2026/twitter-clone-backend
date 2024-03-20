import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(401).json({
        message: "All field is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "user already exits",
        success: false,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: passwordHash,
    });
    return res.status(201).json({
      message: "user create sceessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "email or password are not present",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "user does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "passwords do not match",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//Logout

export const Logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "User Logged out seccessfully",
    success: true,
  });
};
