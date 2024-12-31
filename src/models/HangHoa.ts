import { Schema, model } from 'mongoose';

export enum LoaiHangHoaEnum {
  DT = 'DT',
  LT = 'LT',
  DH = 'DH',
  MTB = 'MTB',
  TN = 'TN',
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

export const hangHoaSchema = new Schema<IHangHoa>(
  {
    TenHangHoa: { type: String, required: true, index: true },
    NgayRaMat: { type: Date, required: true },
    NhaSanXuat: { type: String, required: true },
    MucThueGTGT: { type: Number, required: true, min: 0, max: 100 },
    Gia: { type: Number, required: true, min: 0 },
    SoLuongTonKho: { type: Number, required: true, min: 0 },
    KhoID: { type: Schema.Types.ObjectId, ref: 'Kho', index: true },
    LoaiHangHoa: {
      type: String,
      enum: Object.values(LoaiHangHoaEnum),
      required: true,
    },
  },
  { timestamps: true }
);

const HangHoa = model<IHangHoa>('HangHoa', hangHoaSchema);

export default HangHoa;
