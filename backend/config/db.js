import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://FoodApp:Vaish1234@cluster0.g41svct.mongodb.net/fooddel');
    console.log("DB Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if DB fails to connect
  }
};
