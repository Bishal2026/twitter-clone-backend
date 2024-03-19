import Router from "express";
import { Register } from "../controllers/auth.controllers.js";

const router = Router();
router.route("/register").post(Register);

export default router;
