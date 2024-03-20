import Router from "express";
import {
  LikeOrDisLike,
  createTweet,
  deleteTweet,
} from "../controllers/tweet.controlles.js";
import isAuthenticated from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, LikeOrDisLike);

export default router;
