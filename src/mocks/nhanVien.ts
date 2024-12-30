import { INhanVien } from '../models/NhanVien';
import { PhongBan } from '../models/NhanVien';

// Sample data
export const nhanVienData: INhanVien[] = [
  {
    HoTen: 'Nguyen Van A',
    NgaySinh: new Date('1990-01-01'),
    PhongBan: PhongBan.PhongKyThuat,
    ChucVu: 'Developer',
    NgayVaoLam: new Date('2020-01-01'),
    DiaChi: '123 Main St',
    SoDienThoai: '0123456789',
    Email: 'nguyenvana@example.com',
  },
  {
    HoTen: 'Tran Thi B',
    NgaySinh: new Date('1985-05-15'),
    PhongBan: PhongBan.PhongNhanSu,
    ChucVu: 'Manager',
    NgayVaoLam: new Date('2018-03-15'),
    DiaChi: '456 Elm St',
    SoDienThoai: '0987654321',
    Email: 'tranthib@example.com',
  },
];
