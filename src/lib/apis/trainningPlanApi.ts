import baseApi from './baseApi';
import { CourseType, SpecializedType } from './types';

export const getCourses = async () => {
  try {
    const { data } = await baseApi.get<CourseType[]>('/courses');
    return data;
  } catch (error) {
    throw error;
  }
};
export const getCourseById = async (id: number) => {
  try {
    const { data } = await baseApi.get<CourseType>(`/courses/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const createCourseSpecialized = async ({
  maHP,
  tenHP,
  soTinChi,
  soTietLyThuyet,
  soTietThucHanh,
  soTietThucTap,
  loaiHocPhan,
  tongSoTiet,
  heSoHocPhan,
  hocKy,
}: CourseType) => {
  const course = {
    maHP: maHP,
    tenHP: tenHP,
    soTinChi: soTinChi,
    soTietLyThuyet: soTietLyThuyet,
    soTietThucHanh: soTietThucHanh,
    soTietThucTap: soTietThucTap,
    loaiHocPhan: loaiHocPhan,
    tongSoTiet: tongSoTiet,
    heSoHocPhan: heSoHocPhan,
    hocKy: hocKy,
  };
  try {
    const { data } = await baseApi.post<CourseType>('/courses', course);
    return data;
  } catch (error) {
    throw error;
  }
};
export const createSpecialized = async ({
  tenChuyenNganh,
  idHocPhan,
  hocKyThucHien,
}: SpecializedType) => {
  const specialized = {
    tenChuyenNganh: tenChuyenNganh,
    idHocPhan: idHocPhan,
    hocKyThucHien: hocKyThucHien,
  };
  try {
    const { data } = await baseApi.post<SpecializedType>('/kehoachdayhoc', specialized);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteSpecialized = async (id: number) => {
  try {
    const { data } = await baseApi.delete<SpecializedType>(`/kehoachdayhoc/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteCourseBySpecialized = async (specializedId: number, courseId: number) => {
  try {
    const { data } = await baseApi.delete<SpecializedType>(
      `/kehoachdayhoc/${specializedId}/hocphan/${courseId}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
