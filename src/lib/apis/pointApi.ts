import baseApi from "./baseApi";
import { PointType } from "./types";

export const getAllPoint = async () => {
try {
    const { data } = await baseApi.get<PointType[]>('/diem');
    return data;
}catch(error) { 
   throw error;
}
};
export const getPointByCodeSV = async (codeSV: number) => {
    try {
        const { data } = await baseApi.get<PointType[]>(`/diem/${codeSV}`);
        return data;
    } catch (error) {
        throw error;
    }
} 
export const createPoint = async ( {maSV, diemChuyenCan, diemThucHanh, diemGiuaKy, diemCuoiKy, bangDiemMon, hocKy, nam, lop}: PointType) => {
    const point: PointType = { 
        idCotDiem: 0,
        maSV: maSV,
        tenSV: '',
        diemChuyenCan: diemChuyenCan,
        diemThucHanh: diemThucHanh,
        diemGiuaKy: diemGiuaKy,
        diemCuoiKy: diemCuoiKy,
        bangDiemMon: bangDiemMon,
        hocKy: hocKy,
        nam: nam,
        lop: lop,
    } 
    try {
        const { data } = await baseApi.post<PointType>('/diem', point);
        return data;
    }catch(error) { 
        throw error;
    }
 } 
 // ok 
 export const deletePoint = async (idCotDiem: number) => { 
    try {
        const { data } = await baseApi.delete<PointType>(`/diem/${idCotDiem}`);
        return data;
    }catch(error) { 
        throw error;
    }
  } 
  export const updatePoint = async (idCotDiem: number,  {maSV, diemChuyenCan, diemThucHanh, diemGiuaKy, diemCuoiKy, bangDiemMon, hocKy, nam, lop}: PointType) => {  
    const point: PointType = { 
        idCotDiem: idCotDiem,
        maSV: maSV,
        tenSV: '',
        diemChuyenCan: diemChuyenCan,
        diemThucHanh: diemThucHanh,
        diemGiuaKy: diemGiuaKy,
        diemCuoiKy: diemCuoiKy,
        bangDiemMon: bangDiemMon,
        hocKy: hocKy,
        nam: nam,
        lop: lop,
    }
    try {
        const { data } = await baseApi.put<PointType>(`/diem/${idCotDiem}`, point);
        return data;
    }catch(error) { 
        throw error;
    }
}