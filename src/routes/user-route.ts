import express from "express";
import { ALL_USERS, CURRENT_USER } from "../controllers/user-controller";

const router = express.Router();

router.route("/users").get(ALL_USERS);
router.route("/:id").get(CURRENT_USER);

export const UserRoute = router;
