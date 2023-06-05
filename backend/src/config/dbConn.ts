import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    // ! tell TS variable won't be undefined since var= string | undefined//remove that check
    //not needed//see module argumentation env.d.ts
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
