import Router from "express";
import {
  Boookmark,
  Follow,
  Login,
  Logout,
  Register,
  getMyprofile,
  getOtherUser,
  unFollow,
} from "../controllers/auth.controllers.js";
import isAuthenticated from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmarks/:id").put(isAuthenticated, Boookmark);
router.route("/profile/:id").get(isAuthenticated, getMyprofile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUser);
router.route("/follow/:id").post(isAuthenticated, Follow);
router.route("/unfollow/:id").post(isAuthenticated, unFollow);

export default router;
