import { Schema, model, models } from "mongoose";

const ActivityUSchema = new Schema({
  name: {
    type: String,
    required: true,
    unqiue: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  tags: {
    type: [String],
  },
  downloadURL: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const ActivityU = models?.ActivityU || model("ActivityU", ActivityUSchema);

export default ActivityU;
