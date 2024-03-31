import mongoose from "mongoose";
import { MONGO_URL } from ".";

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully.");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, please make sure db is up and running"
      );
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to MongoDB");
    console.log(error);
  }
};

export default connectDB;
