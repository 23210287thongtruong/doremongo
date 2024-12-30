import { Schema, model } from 'mongoose';

export enum PhongBan {
  BanGiamDoc = 'PB1',
  PhongKinhDoanh = 'PB2',
  PhongTaiChinh = 'PB3',
  PhongKyThuat = 'PB4',
  PhongNhanSu = 'PB5',
  PhongBaoVe = 'PB6',
  PhongQuanLyKho = 'PB7',
  PhongPhapLy = 'PB8',
}

interface IThongTinLuong {
  NgayHieuLuc: Date;
  TruongNhom: boolean;
  LuongCung: number;
  SoNguoiPhuThuoc: number;
}

const thongTinLuongSchema = new Schema<IThongTinLuong>(
  {
    NgayHieuLuc: { type: Date, required: true },
    TruongNhom: { type: Boolean, default: false },
    LuongCung: { type: Number, default: 0 },
    SoNguoiPhuThuoc: { type: Number, default: 0 },
  },
  { _id: false, timestamps: true }
);

export interface INhanVien {
  HoTen: string;
  NgaySinh: Date;
  PhongBan: PhongBan;
  ChucVu: string;
  NgayVaoLam: Date;
  DiaChi: string;
  SoDienThoai: string;
  Email: string;
  ThongTinLuong: IThongTinLuong[];
}

export const nhanVienSchema = new Schema<INhanVien>(
  {
    HoTen: String,
    NgaySinh: Date,
    PhongBan: { type: String, enum: Object.values(PhongBan) },
    ChucVu: String,
    NgayVaoLam: Date,
    DiaChi: String,
    SoDienThoai: String,
    Email: String,
    ThongTinLuong: { type: [thongTinLuongSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

nhanVienSchema.index(
  { 'ThongTinLuong.NgayHieuLuc': 1, _id: 1 },
  { unique: true }
);

export default model<INhanVien>('NhanVien', nhanVienSchema);
