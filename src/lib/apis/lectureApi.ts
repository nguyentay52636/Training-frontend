import baseApi from './baseApi';

export const getLectureAPI = async () => {
  try {
    const { data } = await baseApi.get('/giangvien');
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getLectureByIdAPI = async (id: number) => {};

export const addLectureAPI = async (lecture: {
  maGiangVien: string;
  tenGiangVien: string;
  chucDanh: string;
  namPhong: string;
  trinhDo: string;
  nuoc: string;
  namTotNghiep: string;
}) => {
  try {
    const { data } = await baseApi.post('/giangvien', lecture);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteLectureAPI = async (lectureId: number) => {
  try {
    const { data } = await baseApi.delete('/giangvien/' + lectureId);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
