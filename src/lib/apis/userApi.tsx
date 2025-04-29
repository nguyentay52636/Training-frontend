import baseApi from './baseApi';
import { Role, UserType } from './types';

export const getAllUserAPI = async () => {
  try {
    const { data } = await baseApi.get<UserType[]>('/nguoidung');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteUserAPI = async (userID: number) => {
  try {
    const { data } = await baseApi.delete<UserType>('/nguoidung/' + userID);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchUserAPI = async (keyword?: string) => {
  try {
    const { data } = await baseApi.get<UserType[]>('/nguoidung/timkiem', {
      params: {
        keyword: keyword || '',
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addUserAPI = async () => {};

export const loginAPI = async (userData: { userName: string; password: string }) => {
  try {
    const { data } = await baseApi.post<UserType>('/nguoidung/dangnhap', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const registerAPI = async (userData: { email: string; password: string; role: Role }) => {
  try {
    const { data } = await baseApi.post('/nguoidung/dangky', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
