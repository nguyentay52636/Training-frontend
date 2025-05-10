import baseApi from './baseApi';
import { knowledgeType, CourseType, PhanCongGiangDayType } from './types';

export const getKnows = async () => {
  try {
    const { data } = await baseApi.get('/kien-thuc');
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getKnowledgeById = async (id: number) => {
  try {
    const { data } = await baseApi.get(`/kien-thuc/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getHocPhanByKienThucId = async (id: number): Promise<CourseType[]> => {
  try {
    const { data } = await baseApi.get<CourseType[]>(`/kien-thuc/${id}/hoc-phan`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addKnow = async ({
  tenKienThuc,
  idHocPhan,
  loaiHocPhan,
}: knowledgeType): Promise<knowledgeType> => {
  const newKnow: knowledgeType = {
    tenKienThuc,
    idHocPhan,
    loaiHocPhan,
    hocPhanList: [],
  };
  try {
    const { data } = await baseApi.post<knowledgeType>('/kien-thuc', newKnow);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addCourseToKnowledge = async (idKienThuc: number, idHocPhan: number) => {
  try {
    const { data } = await baseApi.post(`/kien-thuc/${idKienThuc}/hoc-phan/${idHocPhan}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteKnow = async (id: number) => {
  try {
    const { data } = await baseApi.delete(`/kien-thuc/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const updateKnowByCourse = async (
  idKienThuc: number,
  {
    tenKienThuc,
    idHocPhan,
    loaiHocPhan,
  }: { tenKienThuc: string; idHocPhan: number[]; loaiHocPhan: string },
) => {
  try {
    const updateKnow = {
      tenKienThuc,
      idHocPhan,
      loaiHocPhan,
    };
    const { data } = await baseApi.put<knowledgeType>(`/kien-thuc/${idKienThuc}`, updateKnow);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getAllPhanCongGiangDay = async () => {
  try {
    const { data } = await baseApi.get<PhanCongGiangDayType[]>('/phanconggiangday');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error as string);
  }
};

export const addPhanCongGiangDayAPI = async () => {
  try {
    const { data } = await baseApi.post<PhanCongGiangDayType>('/phanconggiangday');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePhanCongGiangDay = async (id: number) => {
  try {
    const { data } = await baseApi.delete('phanconggiangday/' + id);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
