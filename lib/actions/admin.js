"use server";

import adminUser from "../database/models/admin.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createAdminUser(admin) {
  try {
    await connectToDatabase();

    const newAdminUser = await adminUser.create(admin);

    return JSON.parse(JSON.stringify(newAdminUser));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}
