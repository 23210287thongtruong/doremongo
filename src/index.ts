import mongoose from "mongoose";
import { nhanVienData } from "./mocks/nhanVien";
import NhanVien from "./models/NhanVien";

const MONGO_URI =
  "mongodb://root:example@mongodb:27017/doremongo?authSource=admin";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDB();
  await seedNhanVien();
};

seed();

const seedNhanVien = async () => {
  try {
    await NhanVien.insertMany(nhanVienData);
    console.log("NhanVien data seeded");
  } catch (error) {
    console.error("NhanVien seeding error:", error);
  }
};
