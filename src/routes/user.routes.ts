import express from "express";
import { ALL_USERS, CURRENT_USER } from "../controllers/user.controllers";

const router = express.Router();

router.route("/users").get(ALL_USERS);
router.route("/:id").get(CURRENT_USER);

export const UserRoute = router;
