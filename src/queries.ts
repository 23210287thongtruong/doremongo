import HangHoa from './models/HangHoa';
import { chiTietHoaDon, HoaDon } from './models/HoaDon';

const runQueries = async () => {
  try {
    // Query 1: Products by Samsung
    const productsBySamsung = await HangHoa.find(
      { NhaSanXuat: 'Samsung' },
      'HangHoaID TenHangHoa'
    );
    console.log('Products by Samsung:', productsBySamsung);

    // Query 2: Phones priced between 5 to 10 million VND
    const phonesInRange = await HangHoa.find(
      { LoaiHangHoa: 'DT', Gia: { $gte: 5000000, $lte: 10000000 } },
      'HangHoaID TenHangHoa'
    );
    console.log('Phones priced between 5 to 10 million VND:', phonesInRange);

    // Query 3: Invoices in January 2024
    const invoicesInJan2024 = await HoaDon.find({
      NgayLapHD: {
        $gte: new Date('2024-01-01'),
        $lt: new Date('2024-02-01'),
      },
    })
      .sort({ NgayLapHD: 1, TongTien: -1 })
      .select('HoaDonID NgayLapHD TongTien');
    console.log('Invoices in January 2024:', invoicesInJan2024);

    // Query 4: Customers with total invoice value over 20 million VND in 2024
    const customersOver20M = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2024-01-01'),
            $lt: new Date('2025-01-01'),
          },
        },
      },
      { $group: { _id: '$KhachHangID', total: { $sum: '$TongTien' } } },
      { $match: { total: { $gt: 20000000 } } },
      {
        $lookup: {
          from: 'khachhangs',
          localField: '_id',
          foreignField: 'KhachHangID',
          as: 'customer',
        },
      },
      { $unwind: '$customer' },
      {
        $project: {
          KhachHangID: '$_id',
          HoTen: '$customer.HoTen',
          TongChiTieu: '$total',
        },
      },
    ]);
    console.log(
      'Customers with total invoice value over 20 million VND in 2024:',
      customersOver20M
    );

    // Query 5: Products not sold in 2024
    const unsoldProducts2024 = await HangHoa.find(
      {
        HangHoaID: {
          $nin: await chiTietHoaDon.distinct('HangHoaID', {
            HoaDonID: {
              $in: await HoaDon.distinct('_id', {
                NgayLapHD: {
                  $gte: new Date('2024-01-01'),
                  $lt: new Date('2025-01-01'),
                },
              }),
            },
          }),
        },
      },
      'HangHoaID TenHangHoa'
    );
    console.log('Products not sold in 2024:', unsoldProducts2024);

    // Query 6: Invoices with at least 3 different products
    const invoicesWith3Products = await chiTietHoaDon.aggregate([
      {
        $group: {
          _id: '$HoaDonID',
          uniqueProducts: { $addToSet: '$HangHoaID' },
        },
      },
      { $match: { 'uniqueProducts.2': { $exists: true } } },
      {
        $project: {
          HoaDonID: '$_id',
          SoSanPhamKhacNhau: { $size: '$uniqueProducts' },
        },
      },
    ]);
    console.log(
      'Invoices with at least 3 different products:',
      invoicesWith3Products
    );

    // Query 7: Employee with most invoices in 2024
    const topEmployee2024 = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2024-01-01'),
            $lt: new Date('2025-01-01'),
          },
        },
      },
      { $group: { _id: '$NhanVienID', TongSoHoaDon: { $count: {} } } },
      { $sort: { TongSoHoaDon: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'nhanviens',
          localField: '_id',
          foreignField: 'NhanVienID',
          as: 'employee',
        },
      },
      { $unwind: '$employee' },
      {
        $project: {
          NhanVienID: '$_id',
          HoTen: '$employee.HoTen',
          TongSoHoaDon: 1,
        },
      },
    ]);
    console.log('Employee with most invoices in 2024:', topEmployee2024);

    // Query 8: Product with lowest total sales in 2024
    const lowestSalesProduct2024 = await chiTietHoaDon.aggregate([
      {
        $match: {
          HoaDonID: {
            $in: await HoaDon.distinct('_id', {
              NgayLapHD: {
                $gte: new Date('2024-01-01'),
                $lt: new Date('2025-01-01'),
              },
            }),
          },
        },
      },
      { $group: { _id: '$HangHoaID', TongSoLuong: { $sum: '$SoLuong' } } },
      { $sort: { TongSoLuong: 1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'hanghoas',
          localField: '_id',
          foreignField: 'HangHoaID',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $project: {
          HangHoaID: '$_id',
          TenHangHoa: '$product.TenHangHoa',
          TongSoLuong: 1,
        },
      },
    ]);
    console.log(
      'Product with lowest total sales in 2024:',
      lowestSalesProduct2024
    );

    // Query 9: Monthly sales revenue in 2024
    const monthlyRevenue2024 = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2024-01-01'),
            $lt: new Date('2025-01-01'),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$NgayLapHD' },
          DoanhThu: { $sum: '$TongTien' },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { Thang: '$_id', DoanhThu: 1 } },
    ]);
    console.log('Monthly sales revenue in 2024:', monthlyRevenue2024);

    // Query 10: Top 3 customers by total invoice value in 2024
    const top3Customers2024 = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2024-01-01'),
            $lt: new Date('2025-01-01'),
          },
        },
      },
      { $group: { _id: '$KhachHangID', TongChiTieu: { $sum: '$TongTien' } } },
      { $sort: { TongChiTieu: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: 'khachhangs',
          localField: '_id',
          foreignField: 'KhachHangID',
          as: 'customer',
        },
      },
      { $unwind: '$customer' },
      {
        $project: {
          KhachHangID: '$_id',
          HoTen: '$customer.HoTen',
          TongChiTieu: 1,
        },
      },
    ]);
    console.log(
      'Top 3 customers by total invoice value in 2024:',
      top3Customers2024
    );

    // Query 11: Invoices with total amount greater than 20 million VND
    const invoicesOver20M = await HoaDon.aggregate([
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: '$_id',
          TongTien: {
            $sum: { $multiply: ['$ChiTiet.SoLuong', '$hanghoa.Gia'] },
          },
        },
      },
      { $match: { TongTien: { $gt: 20000000 } } },
      { $project: { HoaDonID: '$_id', TongTien: 1 } },
    ]);
    console.log(
      'Invoices with total amount greater than 20 million VND:',
      invoicesOver20M
    );

    // Query 12: Customer with the highest invoice value
    const customerWithHighestInvoice = await HoaDon.aggregate([
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: '$_id',
          TongTien: {
            $sum: { $multiply: ['$ChiTiet.SoLuong', '$hanghoa.Gia'] },
          },
          KhachHangID: { $first: '$KhachHangID' },
        },
      },
      { $sort: { TongTien: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'khachhangs',
          localField: 'KhachHangID',
          foreignField: '_id',
          as: 'khachhang',
        },
      },
      { $unwind: '$khachhang' },
      {
        $project: {
          HoTen: '$khachhang.HoTen',
          KhachHangID: '$khachhang._id',
          GiaTriCaoNhat: '$TongTien',
        },
      },
    ]);
    console.log(
      'Customer with the highest invoice value:',
      customerWithHighestInvoice
    );

    // Query 13: Employee with the most invoices
    const employeeWithMostInvoices = await HoaDon.aggregate([
      { $group: { _id: '$NhanVienID', SoHoaDon: { $count: {} } } },
      { $sort: { SoHoaDon: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'nhanviens',
          localField: '_id',
          foreignField: '_id',
          as: 'nhanvien',
        },
      },
      { $unwind: '$nhanvien' },
      { $project: { NhanVienID: '$_id', SoHoaDon: 1 } },
    ]);
    console.log('Employee with the most invoices:', employeeWithMostInvoices);

    // Query 14: Revenue by manufacturer
    const revenueByManufacturer = await chiTietHoaDon.aggregate([
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: '$hanghoa.NhaSanXuat',
          DoanhThu: { $sum: { $multiply: ['$SoLuong', '$hanghoa.Gia'] } },
        },
      },
    ]);
    console.log('Revenue by manufacturer:', revenueByManufacturer);

    // Query 15: Customers who bought products from Apple
    const customersBoughtApple = await HoaDon.aggregate([
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      { $match: { 'hanghoa.NhaSanXuat': 'Apple' } },
      {
        $lookup: {
          from: 'khachhangs',
          localField: 'KhachHangID',
          foreignField: '_id',
          as: 'khachhang',
        },
      },
      { $unwind: '$khachhang' },
      {
        $group: {
          _id: '$khachhang._id',
          HoTen: { $first: '$khachhang.HoTen' },
          DiaChi: { $first: '$khachhang.DiaChi' },
        },
      },
    ]);
    console.log(
      'Customers who bought products from Apple:',
      customersBoughtApple
    );

    // Query 16: Best-selling product
    const bestSellingProduct = await chiTietHoaDon.aggregate([
      { $group: { _id: '$HangHoaID', TongSoLuong: { $sum: '$SoLuong' } } },
      { $sort: { TongSoLuong: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'hanghoas',
          localField: '_id',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      { $project: { TenHangHoa: '$hanghoa.TenHangHoa', TongSoLuong: 1 } },
    ]);
    console.log('Best-selling product:', bestSellingProduct);

    // Query 17: Invoices with products bought in February 2020
    const invoicesInFeb2020 = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2020-02-01'),
            $lt: new Date('2020-03-01'),
          },
        },
      },
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $lookup: {
          from: 'khachhangs',
          localField: 'KhachHangID',
          foreignField: '_id',
          as: 'khachhang',
        },
      },
      { $unwind: '$khachhang' },
      {
        $group: {
          _id: '$_id',
          NgayLapHD: { $first: '$NgayLapHD' },
          HoTen: { $first: '$khachhang.HoTen' },
        },
      },
    ]);
    console.log(
      'Invoices with products bought in February 2020:',
      invoicesInFeb2020
    );

    // Query 18: Product generating the highest revenue for each manufacturer
    const highestRevenueProductByManufacturer = await chiTietHoaDon.aggregate([
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: { NhaSanXuat: '$hanghoa.NhaSanXuat', HangHoaID: '$HangHoaID' },
          DoanhThu: { $sum: { $multiply: ['$SoLuong', '$hanghoa.Gia'] } },
        },
      },
      { $sort: { '_id.NhaSanXuat': 1, DoanhThu: -1 } },
      {
        $group: {
          _id: '$_id.NhaSanXuat',
          HangHoaID: { $first: '$_id.HangHoaID' },
          DoanhThu: { $first: '$DoanhThu' },
        },
      },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $project: {
          NhaSanXuat: '$_id',
          TenHangHoa: '$hanghoa.TenHangHoa',
          DoanhThu: 1,
        },
      },
    ]);
    console.log(
      'Product generating the highest revenue for each manufacturer:',
      highestRevenueProductByManufacturer
    );

    // Query 19: Customer who bought the most types of products
    const customerWithMostProductTypes = await HoaDon.aggregate([
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: '$KhachHangID',
          SoLoaiSanPham: { $addToSet: '$hanghoa.LoaiHangHoa' },
        },
      },
      {
        $project: {
          KhachHangID: '$_id',
          SoLoaiSanPham: { $size: '$SoLoaiSanPham' },
        },
      },
      { $sort: { SoLoaiSanPham: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'khachhangs',
          localField: 'KhachHangID',
          foreignField: '_id',
          as: 'khachhang',
        },
      },
      { $unwind: '$khachhang' },
      { $project: { HoTen: '$khachhang.HoTen', SoLoaiSanPham: 1 } },
    ]);
    console.log(
      'Customer who bought the most types of products:',
      customerWithMostProductTypes
    );

    // Query 20: Total revenue by month in 2020
    const monthlyRevenue2020 = await HoaDon.aggregate([
      {
        $match: {
          NgayLapHD: {
            $gte: new Date('2020-01-01'),
            $lt: new Date('2021-01-01'),
          },
        },
      },
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          localField: 'ChiTiet.HangHoaID',
          foreignField: '_id',
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $group: {
          _id: { $month: '$NgayLapHD' },
          totalRevenue: {
            $sum: { $multiply: ['$ChiTiet.SoLuong', '$hanghoa.Gia'] },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: '$_id',
          totalRevenue: 1,
          _id: 0,
        },
      },
    ]);

    console.log('Total revenue by month in 2020:', monthlyRevenue2020);

    // Query to find invoices containing "iPhone 11"
    const invoicesWithIphone11 = await HoaDon.aggregate([
      { $unwind: '$ChiTiet' },
      {
        $lookup: {
          from: 'hanghoas',
          let: { hangHoaID: '$ChiTiet.HangHoaID' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$hangHoaID'] } } },
            { $match: { TenHangHoa: 'iPhone 11' } },
          ],
          as: 'hanghoa',
        },
      },
      { $unwind: '$hanghoa' },
      {
        $lookup: {
          from: 'khachhangs',
          localField: 'KhachHangID',
          foreignField: '_id',
          as: 'khachhang',
        },
      },
      { $unwind: '$khachhang' },
      {
        $project: { HoaDonID: '$_id', NgayLapHD: 1, HoTen: '$khachhang.HoTen' },
      },
    ]);

    console.log('Invoices containing "iPhone 11":', invoicesWithIphone11);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

export default runQueries;
