import { IKhachHang } from "../models/KhachHang";
import fs from 'fs';
import path from 'path';

// Sample data
export let khachHangData: IKhachHang[] = [];

// Function to load data from JSON file
const loadFromJSON = (filePath: string) => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const parsedData: IKhachHang[] = JSON.parse(jsonData);

  // Convert date strings to Date objects
  khachHangData = parsedData.map(item => ({
    ...item,
    SinhNhat: new Date(item.SinhNhat),
  }));
};

// Load data based on file type
const dataFilePath = path.join(__dirname, 'khachhang.json'); // Update with your file path
loadFromJSON(dataFilePath);
