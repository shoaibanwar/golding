// Database connection setup
import mongoose from "mongoose";

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected");
    } catch (err) {
      console.error(err.message);
      throw new Error("Error connecting to MongoDB");
    }
  }

  static async disconnect() {
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error("Error disconnecting from MongoDB:", err.message);
    }
  }
}

export default Database;