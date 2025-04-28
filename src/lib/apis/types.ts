export interface UserType {
  id: number;
  userName: string;
  userEmail: string;
  password: string;
  role: number;
  admin: boolean;
  giangVien: boolean;
  user: boolean;
}
export  interface PointType { 
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