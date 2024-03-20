import { Twitte } from "../models/twitte.models.js";
export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "All field is required",
        success: false,
      });
    }

    await Twitte.create({
      description,
      userId: id,
    });
    return res.status(201).json({
      message: "Tweet create successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
