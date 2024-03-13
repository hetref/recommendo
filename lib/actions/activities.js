"use server";

import Activities from "../database/models/activities.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createActivity(activities) {
  try {
    await connectToDatabase();

    const newAct = await Activities.create(activities);

    return JSON.parse(JSON.stringify(newAct));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}
export async function findAllActivities() {
  try {
    await connectToDatabase();

    const users = await Activities.find();

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}
