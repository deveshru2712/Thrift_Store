import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.mongo_Uri);
    console.log(`Successfully connected to the database ✅`);
  } catch (error) {
    console.log(
      `Error occurred while connecting to the database ❌ :${error.message}`
    );
  }
};

export default connectToDb;
