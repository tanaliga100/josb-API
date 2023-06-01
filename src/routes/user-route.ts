import express from "express";
import { CURRENT_USER } from "../controllers/user-controller";

const router = express.Router();

router.route("/").get(CURRENT_USER);

export const UserRoute = router;
