import Router from "express";
import {
  Boookmark,
  Login,
  Logout,
  Register,
} from "../controllers/auth.controllers.js";
import isAuthenticated from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/bookmarks/:id").put(isAuthenticated, Boookmark);

export default router;
