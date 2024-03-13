import { Schema, model, models } from "mongoose";

const ActivitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  //   bannerImage: {
  //     type: String,
  //     required: true,
  //   },
  tags: {
    type: [String],
    required: true,
  },
  // bio: {
  //   type: String,
  // },
  // photo: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // skills: {
  //   type: [String],
  // },
  // interests: {
  //   type: [String],
  // },
});

const Activities = models?.Activities || model("Activities", ActivitiesSchema);

export default Activities;
