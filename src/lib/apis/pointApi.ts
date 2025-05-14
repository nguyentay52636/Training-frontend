import baseApi from './baseApi';
import { PointType } from './types';
import { handleApiError } from '../utils/errorHandler';

export const getAllPoint = async () => {
  try {
    const { data } = await baseApi.get<PointType[]>('/diem');
    return data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const getPointByCodeSV = async (codeSV: number) => {
  try {
    const { data } = await baseApi.get<PointType[]>(`/diem/${codeSV}`);
    return data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const createPoint = async ({
  maSV,
  tenSV,
  diemChuyenCan,
  diemThucHanh,
  diemGiuaKy,
  diemCuoiKy,
  bangDiemMon,
  hocKy,
  nam,
  lop,
}: PointType) => {
  const point: PointType = {
    maSV: maSV,
    tenSV: tenSV,
    diemChuyenCan: diemChuyenCan,
    diemThucHanh: diemThucHanh,
    diemGiuaKy: diemGiuaKy,
    diemCuoiKy: diemCuoiKy,
    bangDiemMon: bangDiemMon,
    hocKy: hocKy,
    nam: nam,
    lop: lop,
  };
  try {
    const { data } = await baseApi.post<PointType>('/diem', point);
    return data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const deletePoint = async (idCotDiem: number) => {
  try {
    const { data } = await baseApi.delete<PointType>(`/diem/${idCotDiem}`);
    return data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const updatePoint = async (
  idCotDiem: number,
  {
    maSV,
    tenSV,
    diemChuyenCan,
    diemThucHanh,
    diemGiuaKy,
    diemCuoiKy,
    bangDiemMon,
    hocKy,
    nam,
    lop,
  }: PointType,
) => {
  const point: PointType = {
    maSV: maSV,
    tenSV: tenSV,
    diemChuyenCan: diemChuyenCan,
    diemThucHanh: diemThucHanh,
    diemGiuaKy: diemGiuaKy,
    diemCuoiKy: diemCuoiKy,
    bangDiemMon: bangDiemMon,
    hocKy: hocKy,
    nam: nam,
    lop: lop,
  };
  try {
    const { data } = await baseApi.put<PointType>(`/diem/${idCotDiem}`, point);
    return data;
  } catch (error: any) {
    handleApiError(error);
  }
};
