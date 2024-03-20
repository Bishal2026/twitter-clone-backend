import Router from "express";
import { createTweet } from "../controllers/tweet.controlles.js";
import isAuthenticated from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/create").post(isAuthenticated, createTweet);

export default router;
