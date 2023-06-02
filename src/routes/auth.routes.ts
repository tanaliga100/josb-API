import express from "express";
import { LOGIN, REGISTER } from "../controllers/auth.controllers";
const router = express.Router();

router.route("/register").post(REGISTER);
router.route("/login").post(LOGIN);

export const AuthRoute = router;
