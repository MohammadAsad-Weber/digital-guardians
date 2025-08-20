import mongoose from "mongoose";

// Establishes a MongoDB connection using Mongoose with error handling
const connectDB = async (url: string | undefined) => {
  try {
    if (!url) throw new Error("The DATABASE_URL variable is not defined in the .env file");
    await mongoose.connect(url);
    console.log("Connected to the database successfully");
  } catch (error) {
    const normalized =
      error instanceof mongoose.Error
        ? error
        : error instanceof Error
        ? error
        : new Error(String(error));
    console.error(`\n[Database Error]: ${normalized.stack || normalized.message}\n`);
    process.exit(1);
  }
};

export default connectDB;
