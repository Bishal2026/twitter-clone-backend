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

//delete tweet

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Twitte.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//like tweet
export const LikeOrDisLike = async (req, res) => {
  try {
    const loggedInuserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Twitte.findById(tweetId);
    if (tweet.Like.includes(loggedInuserId)) {
      await Twitte.findByIdAndUpdate(tweetId, {
        $pull: { Like: loggedInuserId },
      });
      return res.status(200).json({
        message: "Dislike the Tweet",
      });
    } else {
      await Twitte.findByIdAndUpdate(tweetId, {
        $push: { Like: loggedInuserId },
      });
      return res.status(200).json({
        message: "like the Tweet",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
