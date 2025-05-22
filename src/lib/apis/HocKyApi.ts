import baseApi from './baseApi';
import { HocKyType } from './types';

export const getAllHocKyAPI = async () => {
  try {
    const { data } = await baseApi.get<HocKyType[]>('/hocky');
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getHocKyByIdAPI = async (id: number) => {
  try {
    const { data } = await baseApi.get<HocKyType>(`/hocky/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createHocKyAPI = async (idHocPhan: number[]) => {
  try {
    const { data } = await baseApi.post<HocKyType>('/hocky', { idHocPhan });
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateHocKyAPI = async (id: number, idHocPhan: number[]) => {
  try {
    const { data } = await baseApi.put<HocKyType>(`/hocky/${id}`, { idHocPhan });
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteHocKyAPI = async (id: number) => {
  try {
    const { data } = await baseApi.delete<HocKyType>(`/hocky/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const themHocPhanVaoHocKy = async (idHocKy: number, idHocPhan: number) => {
  try {
    const { data } = await baseApi.post<HocKyType>(`/hocky/${idHocKy}/hocphan`, { idHocPhan });
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const xoaHocPhanKhoiHocKy = async (idHocKy: number, idHocPhan: number) => {
  try {
    const { data } = await baseApi.delete<HocKyType>(`/hocky/${idHocKy}/hocphan/${idHocPhan}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const themHocKyVaoChuyenNganh = async (idChuyenNganh: number) => {
  try {
    const { data } = await baseApi.post<HocKyType>(`/kehoachdayhoc/${idChuyenNganh}/hocky`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
