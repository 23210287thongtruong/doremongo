import { Schema, model } from 'mongoose';

export interface IKyLuongNV {
  KyLuong: string;
  TongLuong?: number;
}

const kyLuongNVSchema = new Schema<IKyLuongNV>({
  KyLuong: { type: String, required: true, unique: true },
  TongLuong: { type: Number, default: 0 },
});

export default model('KyLuongNV', kyLuongNVSchema);
