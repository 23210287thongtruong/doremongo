import { Schema, model } from 'mongoose';

interface IChiTietHoaDon {
  HangHoaID: Schema.Types.ObjectId;
  MaCT: Schema.Types.ObjectId;
  SoLuong: number;
  ThanhTien: number;
}

const chiTietHoaDonSchema = new Schema<IChiTietHoaDon>(
  {
    HangHoaID: { type: Schema.Types.ObjectId, ref: 'HangHoa' },
    MaCT: { type: Schema.Types.ObjectId, ref: 'CTGiamGia' },
    SoLuong: { type: Number, required: true },
    ThanhTien: { type: Number, required: true, default: 0 },
  },
  { _id: false, timestamps: true }
);

export const chiTietHoaDon = model<IChiTietHoaDon>(
  'ChiTietHoaDon',
  chiTietHoaDonSchema
);

interface IHoaDon {
  NgayLapHD: Date;
  KhachHangID: Schema.Types.ObjectId;
  NhanVienID: Schema.Types.ObjectId;
  TongTien: number;
  ChiTiet: [IChiTietHoaDon];
}

const hoaDonSchema = new Schema<IHoaDon>(
  {
    NgayLapHD: { type: Date, required: true },
    KhachHangID: { type: Schema.Types.ObjectId, ref: 'KhachHang' },
    NhanVienID: { type: Schema.Types.ObjectId, ref: 'NhanVien' },
    TongTien: { type: Number, required: true, default: 0 },
    ChiTiet: { type: [chiTietHoaDonSchema], default: [] },
  },
  { timestamps: true }
);

hoaDonSchema.index({ 'ChiTiet.HangHoaID': 1, _id: 1 }, { unique: true });

hoaDonSchema.pre('save', function () {
  this.TongTien = this.ChiTiet.reduce(
    (sum, item) => sum + (item.ThanhTien || 0),
    0
  );
});

export const HoaDon = model<IHoaDon>('HoaDon', hoaDonSchema);
