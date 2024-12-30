import { Schema, model } from 'mongoose';

export enum LoaiHangHoaEnum {
  DT = 'Điện thoại',
  LT = 'Laptop',
  DH = 'Đồng hồ',
  MTB = 'Máy tính bảng',
  TN = 'Tai nghe',
}

export interface IHangHoa {
  TenHangHoa: string;
  NgayRaMat: Date;
  NhaSanXuat: string;
  MucThueGTGT: number;
  Gia: number;
  SoLuongTonKho: number;
  KhoID: Schema.Types.ObjectId;
  LoaiHangHoa: LoaiHangHoaEnum;
}

export const hangHoaSchema = new Schema<IHangHoa>({
  TenHangHoa: { type: String, required: true },
  NgayRaMat: { type: Date, required: true },
  NhaSanXuat: { type: String, required: true },
  MucThueGTGT: { type: Number, required: true },
  Gia: { type: Number, required: true },
  SoLuongTonKho: { type: Number, required: true },
  KhoID: { type: Schema.Types.ObjectId, ref: 'Kho' },
  LoaiHangHoa: { type: String, enum: Object.values(LoaiHangHoaEnum) },
});

const HangHoaModel = model<IHangHoa>('HangHoa', hangHoaSchema);

export default HangHoaModel;
