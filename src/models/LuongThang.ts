import { Schema, model } from 'mongoose';

export interface ILuongThang {
  KyLuong: Schema.Types.ObjectId;
  NhanVienID: Schema.Types.ObjectId;
  ThuongThamNien: number;
  PCSinhNhat: number;
  PCChucVu: number;
  NgayCong: number;
  ThuNhapChiuThue: number;
  ThuNhapTinhThue: number;
  ThueTNCN: number;
  BHXH: number;
  HoaHong: number;
  Phat: number;
  LuongThucNhan: number;
}

const luongThangSchema = new Schema<ILuongThang>({
  KyLuong: { type: Schema.Types.ObjectId, ref: 'KyLuongNV', required: true },
  NhanVienID: {
    type: Schema.Types.ObjectId,
    ref: 'NhanVien',
    required: true,
  },
  ThuongThamNien: { type: Number, default: 0 },
  PCSinhNhat: { type: Number, default: 0 },
  PCChucVu: { type: Number, default: 0 },
  NgayCong: Number,
  ThuNhapChiuThue: Number,
  ThuNhapTinhThue: Number,
  ThueTNCN: Number,
  BHXH: Number,
  HoaHong: { type: Number, default: 0 },
  Phat: { type: Number, default: 0 },
  LuongThucNhan: Number,
});

export default model('LuongThang', luongThangSchema);
