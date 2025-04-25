import baseApi from './baseApi';
import { UserType } from './types';

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
