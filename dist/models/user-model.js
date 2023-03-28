"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password"],
        minlength: 6,
        maxlength: 100,
    },
});
// UserSchema.pre("save", async function (): Promise<any> {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
const User = mongoose_1.default.model("Users", UserSchema);
exports.default = User;
