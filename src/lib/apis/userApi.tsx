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

export const addUserAPI = async ({ userName, userEmail, password, role }: UserType) => {
  try {
    const newUser: UserType = {
      userName,
      userEmail,
      password,
      role,
    }
    const { data } = await baseApi.post('/nguoidung/dangky', newUser);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginAPI = async (userData: { userName: string; password: string }) => {
  try {
    const { data } = await baseApi.post<UserType>('/nguoidung/dangnhap', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const registerAPI = async (userData: {
  userName: string;
  userEmail: string;
  password: string;
  role: Role;
}) => {
  try {
    const { data } = await baseApi.post('/nguoidung/dangky', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserAPI = async (userId: number, userData: {
  userName: string;
  userEmail: string;
  role: Role;
}) => {
  try {
    const { data } = await baseApi.put<UserType>(`/nguoidung/${userId}`, userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addAccount = async (userData: {
  userName: string;
  userEmail: string;
  password: string;
  role: Role;
}) => {
  try {
    const { data } = await baseApi.post('/nguoidung/dangky', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};