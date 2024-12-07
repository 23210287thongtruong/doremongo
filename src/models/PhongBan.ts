import { Schema, model } from "mongoose";
import { INhanVien } from "./NhanVien";

interface IPhongBan {
  PhongBanID: string;
  TenPB: string;
  NhanVien: INhanVien[];
}

const phongBanSchema = new Schema<IPhongBan>({
  PhongBanID: { type: String },
  TenPB: { type: String },
  NhanVien: [
    {
      type: Schema.Types.ObjectId,
      ref: "NhanVien",
    },
  ],
});

const PhongBan = model<IPhongBan>("PhongBan", phongBanSchema);

export default PhongBan;
