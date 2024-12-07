import { Schema, model } from "mongoose";

export interface IKhachHang {
  HoTen: string;
  DiaChi: string;
  SoDienThoai: string;
  Email: string;
  SinhNhat: Date;
  DoanhSo: number;
  LoaiKH: string;
}

const khachHangSchema = new Schema<IKhachHang>({
  HoTen: { type: String },
  DiaChi: { type: String },
  SoDienThoai: { type: String },
  Email: { type: String },
  SinhNhat: { type: Date },
  DoanhSo: { type: Number, default: 0 },
  LoaiKH: { type: String },
});

const KhachHang = model<IKhachHang>("KhachHang", khachHangSchema);

export default KhachHang;
