import "dotenv/config";
import mongoose from "mongoose";

const connectToDatabase = (
  mongoDatabaseURI = "mongodb://mongodb:27017/mettzer"
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
