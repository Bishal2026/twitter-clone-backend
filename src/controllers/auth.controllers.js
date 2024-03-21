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
        user,
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

//user bookemarks implements

export const Boookmark = async (req, res) => {
  try {
    const loggedInuserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedInuserId);
    if (user.bookmarks.includes(tweetId)) {
      await User.findByIdAndUpdate(loggedInuserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "remove from  Bookmarked",
      });
    } else {
      await User.findByIdAndUpdate(loggedInuserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "save Bookmarked",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Profile get
export const getMyprofile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//getother user

export const getOtherUser = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUser = await User.find({ _id: { $ne: id } }).select("-password");
    if (!otherUser) {
      return res.status(401).json({
        message: "Currently do not have any user",
      });
    }
    return res.status(200).json({
      otherUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//Follow and UnFollow

export const Follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({
        $push: {
          following: userId,
        },
      });
    } else {
      return res.status(400).json({
        message: `user alraedy follow to ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} just follow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const userId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    if (loggedInUser.following.includes(userId)) {
      await user.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({
        $pull: {
          following: userId,
        },
      });
    } else {
      return res.status(400).json({
        message: `user has not  follow yet`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} just unfollow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
