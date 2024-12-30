import KhachHang from './models/KhachHang';
import Kho from './models/Kho';
import NhanVien from './models/NhanVien';
import HangHoa from './models/HangHoa';
import CTGiamGia from './models/CTGiamGia';
import { HoaDon } from './models/HoaDon';
import KyLuongNV from './models/KyLuongNV';
import LuongThang from './models/LuongThang';

const importData = async () => {
  try {
    await KhachHang.deleteMany({});
    await Kho.deleteMany({});
    await NhanVien.deleteMany({});
    await HangHoa.deleteMany({});
    await CTGiamGia.deleteMany({});
    await HoaDon.deleteMany({});
    await KyLuongNV.deleteMany({});
    await LuongThang.deleteMany({});

    const khachHang = await KhachHang.create([
      {
        HoTen: 'Nguyen Van A',
        DiaChi: '123 Le Loi, HCMC',
        SoDienThoai: '0987654321',
        Email: 'nguyenvana@example.com',
        SinhNhat: new Date('1980-01-01'),
        LoaiKH: 'VIP',
      },
      {
        HoTen: 'Le Thi C',
        DiaChi: '789 Tran Hung Dao, HCMC',
        SoDienThoai: '0987654322',
        Email: 'lethic@example.com',
        SinhNhat: new Date('1985-02-02'),
        LoaiKH: 'Regular',
      },
      {
        HoTen: 'Nguyen Van X',
        DiaChi: '12 Bach Dang, Da Nang',
        SoDienThoai: '0911234567',
        Email: 'nguyenvanx@example.com',
        SinhNhat: new Date('1990-05-05'),
        LoaiKH: 'VIP',
      },
      {
        HoTen: 'Tran Thi Y',
        DiaChi: '45 Nguyen Van Linh, Da Nang',
        SoDienThoai: '0921234568',
        Email: 'tranthiy@example.com',
        SinhNhat: new Date('1995-06-06'),
        LoaiKH: 'Regular',
      },
      {
        HoTen: 'Nguyen Van P',
        DiaChi: '234 Hai Ba Trung, Hanoi',
        SoDienThoai: '0909001234',
        Email: 'nguyenvanp@example.com',
        SinhNhat: new Date('1993-03-15'),
        LoaiKH: 'VIP',
      },
    ]);

    const nhanVien = await NhanVien.create([
      {
        HoTen: 'Tran Thi B',
        NgaySinh: new Date('1990-05-15'),
        PhongBan: 'PB2',
        ChucVu: 'Manager',
        NgayVaoLam: new Date('2015-07-01'),
        DiaChi: '456 Nguyen Trai, HCMC',
        SoDienThoai: '0123456789',
        Email: 'tranthib@example.com',
        ThongTinLuong: [
          {
            NgayHieuLuc: new Date('2022-01-01'),
            TruongNhom: true,
            LuongCung: 15000000,
            SoNguoiPhuThuoc: 2,
          },
        ],
      },
      {
        HoTen: 'Pham Van D',
        NgaySinh: new Date('1988-03-20'),
        PhongBan: 'PB3',
        ChucVu: 'Developer',
        NgayVaoLam: new Date('2018-09-01'),
        DiaChi: '789 Le Van Sy, HCMC',
        SoDienThoai: '0987654323',
        Email: 'phamvand@example.com',
        ThongTinLuong: [
          {
            NgayHieuLuc: new Date('2022-01-01'),
            TruongNhom: false,
            LuongCung: 12000000,
            SoNguoiPhuThuoc: 1,
          },
        ],
      },
      {
        HoTen: 'Le Van Z',
        NgaySinh: new Date('1987-03-03'),
        PhongBan: 'PB1',
        ChucVu: 'Salesperson',
        NgayVaoLam: new Date('2012-04-15'),
        DiaChi: '23 Le Loi, Hue',
        SoDienThoai: '0939876543',
        Email: 'levanz@example.com',
        ThongTinLuong: [
          {
            NgayHieuLuc: new Date('2023-01-01'),
            TruongNhom: true,
            LuongCung: 14000000,
            SoNguoiPhuThuoc: 3,
          },
        ],
      },
      {
        HoTen: 'Pham Thi T',
        NgaySinh: new Date('1992-08-20'),
        PhongBan: 'PB4',
        ChucVu: 'Accountant',
        NgayVaoLam: new Date('2016-11-01'),
        DiaChi: '67 Tran Phu, Hue',
        SoDienThoai: '0901239876',
        Email: 'phamthit@example.com',
        ThongTinLuong: [
          {
            NgayHieuLuc: new Date('2023-06-01'),
            TruongNhom: false,
            LuongCung: 12000000,
            SoNguoiPhuThuoc: 1,
          },
        ],
      },
      {
        HoTen: 'Tran Van Q',
        NgaySinh: new Date('1985-10-10'),
        PhongBan: 'PB2',
        ChucVu: 'Senior Developer',
        NgayVaoLam: new Date('2010-02-15'),
        DiaChi: '123 Thanh Xuan, Hanoi',
        SoDienThoai: '0912345678',
        Email: 'tranvanq@example.com',
        ThongTinLuong: [
          {
            NgayHieuLuc: new Date('2022-01-01'),
            TruongNhom: true,
            LuongCung: 18000000,
            SoNguoiPhuThuoc: 2,
          },
          {
            NgayHieuLuc: new Date('2023-01-01'),
            TruongNhom: true,
            LuongCung: 20000000,
            SoNguoiPhuThuoc: 2,
          },
        ],
      },
    ]);

    const kho = await Kho.create([
      {
        TenKho: 'Kho A',
        DiaChi: '789 Phan Van Tri, HCMC',
        SoDienThoai: '0934567890',
        QuanLykhoID: nhanVien[0]._id,
      },
      {
        TenKho: 'Kho B',
        DiaChi: '123 Nguyen Van Cu, HCMC',
        SoDienThoai: '0934567891',
        QuanLykhoID: nhanVien[1]._id,
      },
      {
        TenKho: 'Kho X',
        DiaChi: '88 Ly Thuong Kiet, Da Nang',
        SoDienThoai: '0936001234',
        QuanLykhoID: nhanVien[0]._id,
      },
      {
        TenKho: 'Kho Y',
        DiaChi: '99 Hoang Dieu, Da Nang',
        SoDienThoai: '0936005678',
        QuanLykhoID: nhanVien[1]._id,
      },
      {
        TenKho: 'Kho C',
        DiaChi: '567 Lang Ha, Hanoi',
        SoDienThoai: '0923456789',
        QuanLykhoID: nhanVien[0]._id,
      },
    ]);

    const hangHoa = await HangHoa.create([
      {
        TenHangHoa: 'iPhone 13',
        NgayRaMat: new Date('2021-09-24'),
        NhaSanXuat: 'Apple',
        MucThueGTGT: 10,
        Gia: 25000000,
        SoLuongTonKho: 50,
        KhoID: kho[0]._id,
        LoaiHangHoa: 'DT',
      },
      {
        TenHangHoa: 'Samsung Galaxy S21',
        NgayRaMat: new Date('2021-01-29'),
        NhaSanXuat: 'Samsung',
        MucThueGTGT: 10,
        Gia: 20000000,
        SoLuongTonKho: 30,
        KhoID: kho[1]._id,
        LoaiHangHoa: 'DT',
      },
      {
        TenHangHoa: 'MacBook Pro 16"',
        NgayRaMat: new Date('2023-01-10'),
        NhaSanXuat: 'Apple',
        MucThueGTGT: 10,
        Gia: 60000000,
        SoLuongTonKho: 25,
        KhoID: kho[0]._id,
        LoaiHangHoa: 'LT',
      },
      {
        TenHangHoa: 'Dell XPS 15',
        NgayRaMat: new Date('2022-09-20'),
        NhaSanXuat: 'Dell',
        MucThueGTGT: 10,
        Gia: 50000000,
        SoLuongTonKho: 15,
        KhoID: kho[1]._id,
        LoaiHangHoa: 'LT',
      },
      {
        TenHangHoa: 'Sony WH-1000XM4',
        NgayRaMat: new Date('2020-08-06'),
        NhaSanXuat: 'Sony',
        MucThueGTGT: 10,
        Gia: 8000000,
        SoLuongTonKho: 100,
        KhoID: kho[0]._id,
        LoaiHangHoa: 'TN',
      },
      {
        TenHangHoa: 'Bose QuietComfort 45',
        NgayRaMat: new Date('2021-09-15'),
        NhaSanXuat: 'Bose',
        MucThueGTGT: 10,
        Gia: 9000000,
        SoLuongTonKho: 80,
        KhoID: kho[0]._id,
        LoaiHangHoa: 'TN',
      },
    ]);

    const ctGiamGia = await CTGiamGia.create([
      {
        NgayBatDau: new Date('2024-01-01'),
        NgayKetThuc: new Date('2024-01-31'),
        GiamGia: 10,
        HangHoaID: hangHoa[0]._id,
      },
      {
        NgayBatDau: new Date('2024-02-01'),
        NgayKetThuc: new Date('2024-02-28'),
        GiamGia: 15,
        HangHoaID: hangHoa[1]._id,
      },
      {
        NgayBatDau: new Date('2024-03-01'),
        NgayKetThuc: new Date('2024-03-31'),
        GiamGia: 8,
        HangHoaID: hangHoa[0]._id,
      },
      {
        NgayBatDau: new Date('2024-04-01'),
        NgayKetThuc: new Date('2024-04-30'),
        GiamGia: 12,
        HangHoaID: hangHoa[1]._id,
      },
      {
        NgayBatDau: new Date('2024-05-01'),
        NgayKetThuc: new Date('2024-05-31'),
        GiamGia: 5,
        HangHoaID: hangHoa[0]._id,
      },
      {
        NgayBatDau: new Date('2024-06-01'),
        NgayKetThuc: new Date('2024-06-30'),
        GiamGia: 10,
        HangHoaID: hangHoa[1]._id,
      },
    ]);

    const hoaDon = await HoaDon.create([
      {
        NgayLapHD: new Date(),
        KhachHangID: khachHang[0]._id,
        NhanVienID: nhanVien[0]._id,
        ChiTiet: [
          {
            HangHoaID: hangHoa[0]._id,
            MaCT: ctGiamGia[0]._id,
            SoLuong: 2,
            ThanhTien: hangHoa[0].Gia * 2 * (1 - ctGiamGia[0].GiamGia / 100),
          },
        ],
      },
      {
        NgayLapHD: new Date(),
        KhachHangID: khachHang[1]._id,
        NhanVienID: nhanVien[1]._id,
        ChiTiet: [
          {
            HangHoaID: hangHoa[1]._id,
            MaCT: ctGiamGia[1]._id,
            SoLuong: 1,
            ThanhTien: hangHoa[1].Gia * (1 - ctGiamGia[1].GiamGia / 100),
          },
        ],
      },
      {
        NgayLapHD: new Date(),
        KhachHangID: khachHang[0]._id,
        NhanVienID: nhanVien[0]._id,
        ChiTiet: [
          {
            HangHoaID: hangHoa[0]._id,
            MaCT: ctGiamGia[0]._id,
            SoLuong: 1,
            ThanhTien: hangHoa[0].Gia * (1 - ctGiamGia[0].GiamGia / 100),
          },
        ],
      },
      {
        NgayLapHD: new Date(),
        KhachHangID: khachHang[1]._id,
        NhanVienID: nhanVien[1]._id,
        ChiTiet: [
          {
            HangHoaID: hangHoa[1]._id,
            MaCT: ctGiamGia[1]._id,
            SoLuong: 2,
            ThanhTien: hangHoa[1].Gia * 2 * (1 - ctGiamGia[1].GiamGia / 100),
          },
        ],
      },
      {
        NgayLapHD: new Date(),
        KhachHangID: khachHang[0]._id,
        NhanVienID: nhanVien[0]._id,
        ChiTiet: [
          {
            HangHoaID: hangHoa[0]._id,
            MaCT: ctGiamGia[0]._id,
            SoLuong: 2,
            ThanhTien: hangHoa[0].Gia * 2 * (1 - ctGiamGia[0].GiamGia / 100),
          },
          {
            HangHoaID: hangHoa[1]._id,
            MaCT: ctGiamGia[1]._id,
            SoLuong: 1,
            ThanhTien: hangHoa[1].Gia * (1 - ctGiamGia[1].GiamGia / 100),
          },
        ],
      },
    ]);

    const kyLuong = await KyLuongNV.create([
      {
        KyLuong: '2024-01',
        TongLuong: 30000000,
      },
      {
        KyLuong: '2024-02',
        TongLuong: 32000000,
      },
      {
        KyLuong: '2024-03',
        TongLuong: 28000000,
      },
      {
        KyLuong: '2024-04',
        TongLuong: 31000000,
      },
      {
        KyLuong: '2024-05',
        TongLuong: 38000000,
      },
    ]);

    await LuongThang.create([
      {
        KyLuong: kyLuong[0]._id,
        NhanVienID: nhanVien[0]._id,
        ThuongThamNien: 500000,
        PCSinhNhat: 200000,
        PCChucVu: 1000000,
        NgayCong: 22,
        ThuNhapChiuThue: 25000000,
        ThuNhapTinhThue: 24000000,
        ThueTNCN: 1200000,
        BHXH: 2000000,
        HoaHong: 500000,
        Phat: 100000,
        LuongThucNhan: 26780000,
      },
      {
        KyLuong: kyLuong[1]._id,
        NhanVienID: nhanVien[1]._id,
        ThuongThamNien: 600000,
        PCSinhNhat: 250000,
        PCChucVu: 1200000,
        NgayCong: 20,
        ThuNhapChiuThue: 27000000,
        ThuNhapTinhThue: 26000000,
        ThueTNCN: 1300000,
        BHXH: 2100000,
        HoaHong: 600000,
        Phat: 150000,
        LuongThucNhan: 28000000,
      },
      {
        KyLuong: kyLuong[0]._id,
        NhanVienID: nhanVien[0]._id,
        ThuongThamNien: 400000,
        PCSinhNhat: 150000,
        PCChucVu: 900000,
        NgayCong: 21,
        ThuNhapChiuThue: 26000000,
        ThuNhapTinhThue: 25000000,
        ThueTNCN: 1250000,
        BHXH: 1900000,
        HoaHong: 700000,
        Phat: 80000,
        LuongThucNhan: 27022000,
      },
      {
        KyLuong: kyLuong[1]._id,
        NhanVienID: nhanVien[1]._id,
        ThuongThamNien: 500000,
        PCSinhNhat: 200000,
        PCChucVu: 1000000,
        NgayCong: 23,
        ThuNhapChiuThue: 29000000,
        ThuNhapTinhThue: 28000000,
        ThueTNCN: 1400000,
        BHXH: 2000000,
        HoaHong: 800000,
        Phat: 100000,
        LuongThucNhan: 30300000,
      },
      {
        KyLuong: kyLuong[0]._id,
        NhanVienID: nhanVien[0]._id,
        ThuongThamNien: 1000000,
        PCSinhNhat: 300000,
        PCChucVu: 2000000,
        NgayCong: 24,
        ThuNhapChiuThue: 35000000,
        ThuNhapTinhThue: 34000000,
        ThueTNCN: 1700000,
        BHXH: 2500000,
        HoaHong: 1000000,
        Phat: 200000,
        LuongThucNhan: 37580000,
      },
    ]);

    console.log('Data imported successfully!');
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

export default importData;
