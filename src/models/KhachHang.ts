import { Schema, model } from 'mongoose';

enum LoaiKH {
  'VIP' = 'VIP',
  'Regular' = 'Regular',
}

export interface IKhachHang {
  HoTen: string;
  DiaChi: string;
  SoDienThoai: string;
  Email: string;
  SinhNhat: Date;
  DoanhSo: number;
  LoaiKH: LoaiKH;
}

const khachHangSchema = new Schema<IKhachHang>(
  {
    HoTen: { type: String, required: true },
    DiaChi: { type: String, required: true },
    SoDienThoai: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[0-9]{10,15}$/.test(value);
        },
        message: 'Invalid phone number.',
      },
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    SinhNhat: { type: Date, required: true },
    DoanhSo: { type: Number, default: 0, min: 0 },
    LoaiKH: {
      type: String,
      enum: Object.values(LoaiKH),
      default: LoaiKH.Regular,
    },
  },
  { timestamps: true }
);

const KhachHang = model<IKhachHang>('KhachHang', khachHangSchema);

export default KhachHang;
