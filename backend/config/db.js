// config/db.js
import mongoose from "mongoose";

const mongDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("🧩 Check your .env file and internet connection.");
    process.exit(1);
  }
};

export default mongDB;
