import { Schema, model } from 'mongoose';

export interface IKhachHang {
  HoTen: string;
  DiaChi: string;
  SoDienThoai: string;
  Email: string;
  SinhNhat: Date;
  DoanhSo?: number;
  LoaiKH?: string;
}

const khachHangSchema = new Schema<IKhachHang>({
  HoTen: String,
  DiaChi: String,
  SoDienThoai: String,
  Email: String,
  SinhNhat: Date,
  DoanhSo: { type: Number, default: 0 },
  LoaiKH: { type: String, default: '' },
});

const KhachHang = model<IKhachHang>('KhachHang', khachHangSchema);

export default KhachHang;
