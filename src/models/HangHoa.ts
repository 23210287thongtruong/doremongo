import { Schema, model } from "mongoose";

export interface ILoaiHangHoa {
  TenLoaiHangHoa: string;
}

export const loaiHangHoaSchema = new Schema<ILoaiHangHoa>({
  TenLoaiHangHoa: { type: "string", required: true },
});

export interface ICTGiamGia {
  NgayBatDau: Date;
  NgayKetThuc: Date;
  GiamGia: number;
}

export const ctGiamGiaSchema = new Schema<ICTGiamGia>({
  NgayBatDau: { type: Date, required: true },
  NgayKetThuc: { type: Date, required: true },
  GiamGia: { type: Number, required: true },
});

export interface IHangHoa {
  TenHangHoa: string;
  NgayRaMat: Date;
  NhaSanXuat: string;
  MucThueGTGT: number;
  Gia: number;
  SoLuongTonKho: number;
  LoaiHangHoa: ILoaiHangHoa;
  CTGiamGia: ICTGiamGia;
}

export const hangHoaSchema = new Schema<IHangHoa>({
  TenHangHoa: { type: "string", required: true },
  NgayRaMat: { type: Date, required: true },
  NhaSanXuat: { type: "string", required: true },
  MucThueGTGT: { type: Number, required: true },
  Gia: { type: Number, required: true },
  SoLuongTonKho: { type: Number, required: true },
  LoaiHangHoa: { type: Schema.Types.ObjectId, ref: "LoaiHangHoa" },
  CTGiamGia: { type: Schema.Types.ObjectId, ref: "CTGiamGia" },
});

const HangHoaModel = model<IHangHoa>("HangHoa", hangHoaSchema);

export default HangHoaModel;
