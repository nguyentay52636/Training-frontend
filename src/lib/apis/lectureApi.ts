import baseApi from './baseApi';
import { LectureType } from './types';

export const getLectureAPI = async () => {
  try {
    const { data } = await baseApi.get('/giangvien');
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};


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

export const addLectureExcelAPI = async({maGiangVien, tenGiangVien, chucDanh, namPhong, trinhDo, nuoc, namTotNghiep }:LectureType) => {
  try {
    const newLecture : LectureType = {
      maGiangVien,
      tenGiangVien,
      chucDanh,
      namPhong,
      trinhDo,
      nuoc,
      namTotNghiep } 
    const {data} = await baseApi.post('/giangvien',newLecture);
    return data;

  } catch (error) {
    throw new Error(error as string);
  }
};
export const updateLectureAPI = async( id:number,{ maGiangVien, tenGiangVien, chucDanh, namPhong, trinhDo, nuoc, namTotNghiep }: LectureType) => {
try{
    const newLecture :LectureType= { 
    maGiangVien,
    tenGiangVien,
    chucDanh,
    namPhong,
    trinhDo,
    nuoc,
    namTotNghiep
  }
  const {data} = await baseApi.put(`/giangvien/${id}`,newLecture);
  return data;
}catch(error){
  throw new Error(error as string);
}
 } 
