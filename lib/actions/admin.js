"use server";

import Admin from "../database/models/Admin.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createAdmin(user) {
  try {
    await connectToDatabase();

    const newAdmin = await Admin.create(user);

    return JSON.parse(JSON.stringify(newAdmin));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// FIND ONE
export async function findAdmin(id) {
  try {
    await connectToDatabase();

    // const newUser = await User.create(user);
    const findAdmin = await Admin.findOne({ firebaseId: id });

    return JSON.parse(JSON.stringify(findAdmin));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// UPDATE ONE
export async function updateAdmin(id, user) {
  try {
    await connectToDatabase();

    const updatedAdmin = await Admin.findOneAndUpdate(
      {
        firebaseId: id,
      },
      user,
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedAdmin));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// FIND ALL
