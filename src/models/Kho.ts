import { Schema, model } from 'mongoose';

export interface IKho {
  TenKho: string;
  DiaChi: string;
  SoDienThoai: string;
  QuanLykhoID: Schema.Types.ObjectId;
}

const khoSchema = new Schema<IKho>(
  {
    TenKho: String,
    DiaChi: String,
    SoDienThoai: String,
    QuanLykhoID: { type: Schema.Types.ObjectId, ref: 'NhanVien' },
  },
  { timestamps: true }
);

const Kho = model<IKho>('Kho', khoSchema);

export default Kho;
