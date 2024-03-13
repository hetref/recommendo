import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  try {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "recomendo",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }

  return cached.conn;
};
