import { Schema, model, models } from "mongoose";

const ActivitiesSchema = new Schema({
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
});

const Activities = models?.Activities || model("Activities", ActivitiesSchema);

export default Activities;
