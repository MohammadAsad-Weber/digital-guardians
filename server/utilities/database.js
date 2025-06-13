import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error(`\nDatabase_Error: ${error.message}\n`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
