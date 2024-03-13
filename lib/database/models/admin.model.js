import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = models?.Admin || model("Admin", AdminSchema);

export default Admin;
