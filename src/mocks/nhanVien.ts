import { INhanVien } from "../models/NhanVien";
import fs from 'fs';
import path from 'path';

// Sample data
export let nhanVienData: INhanVien[] = [];
//   {
//     HoTen: "Nguyen Van A",
//     NgaySinh: new Date("1990-01-01"),
//     PhongBan: "IT",
//     ChucVu: "Developer",
//     NgayVaoLam: new Date("2020-01-01"),
//     DiaChi: "123 Main St",
//     SoDienThoai: "0123456789",
//     Email: "nguyenvana@example.com",
//   },
//   {
//     HoTen: "Tran Thi B",
//     NgaySinh: new Date("1985-05-15"),
//     PhongBan: "HR",
//     ChucVu: "Manager",
//     NgayVaoLam: new Date("2018-03-15"),
//     DiaChi: "456 Elm St",
//     SoDienThoai: "0987654321",
//     Email: "tranthib@example.com",
//   },
// ];

// Function to load data from JSON file
const loadFromJSON = (filePath: string) => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const parsedData: INhanVien[] = JSON.parse(jsonData);

  // Convert date strings to Date objects
  nhanVienData = parsedData.map(item => ({
    ...item,
    NgaySinh: new Date(item.NgaySinh),
    NgayVaoLam: new Date(item.NgayVaoLam)
  }));
};

// Load data based on file type
const dataFilePath = path.join(__dirname, 'nhanvien.json'); // Update with your file path
loadFromJSON(dataFilePath);
