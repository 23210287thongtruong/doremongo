import { Schema, model } from "mongoose";
import { IKhachHang } from "./KhachHang";
import { IHangHoa } from "./HangHoa";
import { INhanVien } from "./NhanVien";

export interface IHangDaDat {
  TenHangHoa: string;
  Gia: number;
  SoLuong: number;
  HangHoa: IHangHoa;
}

export interface IHoaDon {
  NgayLapHD: Date;
  KhachHang: IKhachHang;
  NhanVien: INhanVien;
  TongTien: number;
  HangDaDat: IHangDaDat[];
}

export const hoaDonSchema = new Schema<IHoaDon>({
  NgayLapHD: { type: Date, required: true },
  KhachHang: { type: Schema.Types.ObjectId, ref: "KhachHang" },
  NhanVien: { type: Schema.Types.ObjectId, ref: "NhanVien" },
  TongTien: { type: Number, required: true },
  HangDaDat: [
    {
      TenHangHoa: { type: String },
      Gia: { type: Number },
      SoLuong: { type: Number },
      HangHoa: { type: Schema.Types.ObjectId, ref: "HangHoa" },
    },
  ],
});

const HoaDon = model<IHoaDon>("HoaDon", hoaDonSchema);

export default HoaDon;
