import Router from "express";
import {
  FollowingUserTweet,
  LikeOrDisLike,
  createTweet,
  deleteTweet,
  getAllTweet,
} from "../controllers/tweet.controlles.js";
import isAuthenticated from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, LikeOrDisLike);

router.route("/alltweet/:id").get(isAuthenticated, getAllTweet);
router.route("/followingtweet/:id").get(isAuthenticated, FollowingUserTweet);

export default router;
