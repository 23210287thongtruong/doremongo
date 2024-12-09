import mongoose from "mongoose";
import { nhanVienData } from "./mocks/nhanVien";
import { khachHangData } from "./mocks/khachHang";
import NhanVien from "./models/NhanVien";
import KhachHang from "./models/KhachHang";

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
  await seedKhachHang();
  mongoose.connection.close();
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

const seedKhachHang = async () => {
  try {
    await KhachHang.insertMany(khachHangData);
    console.log("KhachHang data seeded");
  } catch (error) {
    console.error("KhachHang seeding error:", error);
  }
};
