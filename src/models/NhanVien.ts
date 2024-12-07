import { Schema, model } from "mongoose";

export interface INhanVien {
  HoTen: string;
  NgaySinh: Date;
  PhongBan: string;
  ChucVu: string;
  NgayVaoLam: Date;
  DiaChi: string;
  SoDienThoai: string;
  Email: string;
}

export const nhanVienSchema = new Schema<INhanVien>({
  HoTen: { type: String },
  NgaySinh: { type: Date },
  PhongBan: { type: String },
  ChucVu: { type: String },
  NgayVaoLam: { type: Date },
  DiaChi: { type: String },
  SoDienThoai: { type: String },
  Email: { type: String },
});

export default model<INhanVien>("NhanVien", nhanVienSchema);
