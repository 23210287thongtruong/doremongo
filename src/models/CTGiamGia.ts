import { Schema, model } from 'mongoose';

export interface ICTGiamGia {
  NgayBatDau: Date;
  NgayKetThuc: Date;
  GiamGia: number;
  HangHoaID: Schema.Types.ObjectId;
}

const ctGiamGiaSchema = new Schema<ICTGiamGia>(
  {
    NgayBatDau: { type: Date, required: true },
    NgayKetThuc: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > this.NgayBatDau;
        },
        message: 'NgayKetThuc must be after NgayBatDau.',
      },
    },
    GiamGia: { type: Number, required: true, min: 0 },
    HangHoaID: { type: Schema.Types.ObjectId, ref: 'HangHoa', index: true },
  },
  { timestamps: true }
);

const CTGiamGia = model<ICTGiamGia>('CTGiamGia', ctGiamGiaSchema);

export default CTGiamGia;
