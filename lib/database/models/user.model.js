import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
  },
  interests: {
    type: [String],
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
