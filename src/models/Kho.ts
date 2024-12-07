import { Schema, model } from "mongoose";
import { INhanVien } from "./NhanVien";
import { IHangHoa } from "./HangHoa";

interface IKho {
  KhoID: string;
  TenKho: string;
  DiaChi: string;
  SoDienThoai: string;
  QuanLykhoID: INhanVien;
  HangHoa: IHangHoa[];
}

const khoSchema = new Schema<IKho>({
  TenKho: { type: String },
  DiaChi: { type: String },
  SoDienThoai: { type: String },
  QuanLykhoID: { type: Schema.Types.ObjectId, ref: "NhanVien" },
  HangHoa: [
    {
      type: Schema.Types.ObjectId,
      ref: "HangHoa",
    },
  ],
});

const Kho = model<IKho>("Kho", khoSchema);

export default Kho;
