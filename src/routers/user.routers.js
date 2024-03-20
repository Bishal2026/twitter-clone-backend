import Router from "express";
import { Login, Logout, Register } from "../controllers/auth.controllers.js";

const router = Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

export default router;
