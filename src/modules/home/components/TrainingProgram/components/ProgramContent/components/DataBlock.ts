export interface HocPhan {
  maHP: string;
  tenHP: string;
  soTinChi: number;
  soTietLyThuyet: number;
  soTietThucHanh: number;
  soTietThucTap: number;
  loaiHocPhan: string;
  tongSoTiet: number;
  heSoHocPhan: number;
}

interface KhoiKienThuc {
  idKhoiKienThuc: number;
  tenKhoiKienThuc: string;
  loaiHocPhan: string; // Đã thêm
  hocPhanList: HocPhan[];
}

const khoiKienThucData: KhoiKienThuc[] = [
  {
    idKhoiKienThuc: 1,
    tenKhoiKienThuc: "Khối kiến thức giáo dục đại cương",
    loaiHocPhan: "Bắt buộc",
    hocPhanList: [
      {
        maHP: "PHL101",
        tenHP: "Triết học Mác – Lênin",
        soTinChi: 3,
        soTietLyThuyet: 30,
        soTietThucHanh: 0,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 30,
        heSoHocPhan: 1
      },
      {
        maHP: "PHL102",
        tenHP: "Tư tưởng Hồ Chí Minh",
        soTinChi: 2,
        soTietLyThuyet: 20,
        soTietThucHanh: 0,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 20,
        heSoHocPhan: 1
      },
      {
        maHP: "PHL103",
        tenHP: "Đường lối cách mạng của ĐCSVN",
        soTinChi: 2,
        soTietLyThuyet: 20,
        soTietThucHanh: 0,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 20,
        heSoHocPhan: 1
      }
    ]
  },
  {
    idKhoiKienThuc: 2,
    tenKhoiKienThuc: "Khối kiến thức giáo dục thể chất",
    loaiHocPhan: "Bắt buộc & Tự chọn",
    hocPhanList: [
      {
        maHP: "PE101",
        tenHP: "Giáo dục thể chất 1",
        soTinChi: 1,
        soTietLyThuyet: 0,
        soTietThucHanh: 15,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 15,
        heSoHocPhan: 1
      },
      {
        maHP: "PE102",
        tenHP: "Giáo dục thể chất 2",
        soTinChi: 1,
        soTietLyThuyet: 0,
        soTietThucHanh: 15,
        soTietThucTap: 0,
        loaiHocPhan: "Tự chọn",
        tongSoTiet: 15,
        heSoHocPhan: 1
      }
    ]
  },
  {
    idKhoiKienThuc: 3,
    tenKhoiKienThuc: "Khối kiến thức giáo dục quốc phòng - an ninh",
    loaiHocPhan: "Bắt buộc",
    hocPhanList: [
      {
        maHP: "QP101",
        tenHP: "Giáo dục quốc phòng - an ninh 1",
        soTinChi: 2,
        soTietLyThuyet: 10,
        soTietThucHanh: 10,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 20,
        heSoHocPhan: 1
      },
      {
        maHP: "QP102",
        tenHP: "Giáo dục quốc phòng - an ninh 2",
        soTinChi: 2,
        soTietLyThuyet: 10,
        soTietThucHanh: 10,
        soTietThucTap: 0,
        loaiHocPhan: "Bắt buộc",
        tongSoTiet: 20,
        heSoHocPhan: 1
      }
    ]
  }
];

export default khoiKienThucData;
