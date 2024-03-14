import { Schema, model, models } from "mongoose";

const adminUserSchema = new Schema({
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const adminUser = models?.adminUser || model("adminUser", adminUserSchema);

export default adminUser;
