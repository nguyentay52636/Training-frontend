export interface UserType {
  id?: number;
  userName: string;
  userEmail: string;
  password: string;
  role: number;
  admin?: boolean;
  giangVien?: boolean;
  user?: boolean;
}
export interface PointType {
  idCotDiem?: number;
  maSV: string;
  tenSV: string;
  diemChuyenCan: number;
  diemThucHanh: number;
  diemGiuaKy: number;
  diemCuoiKy: number;
  bangDiemMon: string;
  hocKy: number;
  nam: string;
  lop: string;
}
export interface CourseType {
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
export interface SpecializedType {
  tenChuyenNganh: string;
  idHocPhan: string;
  hocKyThucHien: number;
}

export enum Role {
  GiangVien = 1,
  Admin = 2,
}
export interface BlockKnowType {
  idKhoiKienThuc?: number;
  tenKhoiKienThuc: string;
  idKienThuc?: [];
  kienThucList: knowledgeType[];
}
export interface knowledgeType {
  idKienThuc?: number;
  tenKienThuc: string;
  idHocPhan: number[];
  loaiHocPhan: string;
  hocPhanList: CourseType[];
}
export interface CourseType {
  idHocPhan?: number;
  maHP: string;
  tenHP: string;
  soTinChi: number;
  soTietLyThuyet: number;
  soTietThucHanh: number;
  soTietThucTap: number;
  tongSoTiet: number;
  loaiHocPhan: string;
  heSoHocPhan: number;
}

export interface PropramData {
  id: number;
  idThongTin: number;
  thongTinChung: ThongTinChung[];
}

export interface ThongTinChung {
  id: number;
  tenChuongTrinh: string;
  bac: string;
  loaiBang: string;
  loaiHinhDaoTao: string;
  thoiGian: string;
  soTinChi: number;
  khoaQuanLy: string;
  ngonNgu: string;
  khoaTuyen: string;
}

export interface PhanCongGiangDayType {
  idPhanCong: number;
  idGiangVien: number;
  idHocPhan: number;
  hocKy: number;
  tenMonHoc: string;
  soTietThucHien: number;
  soTietThucTe: number;
  giangVien: GiangVien;
  hocPhan: null;
}

export interface GiangVien {
  idGiangVien: number;
  idTaiKhoan: number;
  nguoiDung: NguoiDung;
  maGiangVien: string;
  tenGiangVien: string;
  chucDanh: string;
  namPhong: string;
  trinhDo: string;
  nuoc: string;
  namTotNghiep: string;
}

export interface NguoiDung {
  id: number;
  userName: string;
  userEmail: string;
  password: string;
  role: number;
  admin: boolean;
  user: boolean;
  giangVien: boolean;
}

export interface HocKyType {
  idHocKy?: number;
  idHocPhan: number[];
  hocPhanList?: CourseType[];
}
export interface ChuyenNganhType {
  idChuyenNganh?: number;
  tenChuyenNganh: string;
  idHocKy: number[];
  hocPhanList?: CourseType[];
}

export interface KeHoachMoNhomType {
  id?: number;
  namHoc: string;
  soNhom: number;
}

export interface LectureType {
  idGiangVien?: number;
  maGiangVien: string;
  tenGiangVien: string;
  chucDanh: string;
  namPhong: string;
  trinhDo: string;
  nuoc: string;
  namTotNghiep: string;
}
