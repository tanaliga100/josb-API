"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
router.route("/users").get(user_controller_1.ALL_USERS);
router.route("/:id").get(user_controller_1.CURRENT_USER);
exports.UserRoute = router;
