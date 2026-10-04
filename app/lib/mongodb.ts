import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kvi_coaching";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // 2s fast timeout
      connectTimeoutMS: 2000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB database.");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    if (e.message?.includes("ECONNREFUSED") || e.name === "MongooseServerSelectionError") {
      console.warn("⚠️ MongoDB service is offline (127.0.0.1:27017). Operating in fallback preview mode.");
    } else {
      console.error("Failed to connect to MongoDB:", e.message || e);
    }
    throw e;
  }

  return cached.conn;
}
