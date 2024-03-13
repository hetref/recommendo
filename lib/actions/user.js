"use server";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// FIND ONE
export async function findUser(id) {
  try {
    await connectToDatabase();

    // const newUser = await User.create(user);
    const findUser = await User.findOne({ firebaseId: id });

    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// UPDATE ONE
export async function updateUser(id, user) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      {
        firebaseId: id,
      },
      user,
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    // handleError(error);
    return JSON.parse(JSON.stringify(error));
  }
}

// FIND ALL
