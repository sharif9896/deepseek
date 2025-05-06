import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    (cached.promise = mongoose.connect(process.env.MONGODB_URI)),
      then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB connection error:", e);
  }
  return cached.conn;
}
