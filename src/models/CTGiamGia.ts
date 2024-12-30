import { Schema, model } from 'mongoose';

export interface ICTGiamGia {
  NgayBatDau: Date;
  NgayKetThuc: Date;
  GiamGia: number;
  HangHoaID: Schema.Types.ObjectId;
}

const ctGiamGiaSchema = new Schema<ICTGiamGia>({
  NgayBatDau: { type: Date, required: true },
  NgayKetThuc: { type: Date, required: true },
  GiamGia: { type: Number, required: true },
  HangHoaID: { type: Schema.Types.ObjectId, ref: 'HangHoa' },
});

const CTGiamGia = model<ICTGiamGia>('CTGiamGia', ctGiamGiaSchema);

export default CTGiamGia;
