import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://yashuvarmora:Yash%408484@cluster0.gq1xm.mongodb.net/");
    console.log(
      `MongoDB is Connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
