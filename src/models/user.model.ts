import mongoose, { Schema } from "mongoose";
const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
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

const User = mongoose.model("User", UserSchema);
export default User;
