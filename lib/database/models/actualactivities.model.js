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
  AdminId: {
    // This field is for relating the activity to an admin user. It's not used in queries or showing data to users.
    // This is a virtual field that will be populated by the admin who created this activity.
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

const Activities = models?.Activities || model("Activities", ActivitiesSchema);

export default Activities;
