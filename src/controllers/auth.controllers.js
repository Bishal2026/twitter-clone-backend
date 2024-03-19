import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(401).json({
        message: "All field is required",
        success: false,
      });
    }

    const user = await User.findOne(email);
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
