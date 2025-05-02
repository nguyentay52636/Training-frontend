export interface UserType {
  id: number;
  userName: string;
  userEmail: string;
  password: string;
  role: number;
  admin: boolean;
  giangVien: boolean;
  user: Role;
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
  hocKy: number;
}
export interface SpecializedType {
  tenChuyenNganh: string;
  idHocPhan: string;
  hocKyThucHien: number;
}

export enum Role {
  User = 0,
  GiangVien = 1,
  Admin = 2,
}
export interface BlockKnowType { 
  idKhoiKienThuc?: number;
  tenKhoiKienThuc: string;
  idKienThuc? : string;
  danhSachKienThuc: knowledgeType[];
}
export interface knowledgeType  { 
  idKienThuc?: number;
  tenKienThuc: string;
  idHocPhan: string;
  loaiHocPhan:string;
  hocPhans: CourseType[];
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

