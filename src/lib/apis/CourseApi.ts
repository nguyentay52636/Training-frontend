import { data } from 'react-router-dom';
import baseApi from './baseApi';
import { CourseType, IThongTinChungDataType } from './types';

// Read operations
export const getAllCourse = async () => {
  try {
    const { data } = await baseApi.get<CourseType[]>('/hocphan');
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCourseById = async (id: number) => {
  try {
    const { data } = await baseApi.get<CourseType>(`/hocphan/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Create operation
export const createCourse = async ({
  maHP,
  tenHP,
  soTinChi,
  soTietLyThuyet,
  soTietThucHanh,
  soTietThucTap,
  loaiHocPhan,
  tongSoTiet,
  heSoHocPhan,
}: CourseType) => {
  const newCourse = {
    maHP,
    tenHP,
    soTinChi,
    soTietLyThuyet,
    soTietThucHanh,
    soTietThucTap,
    loaiHocPhan,
    tongSoTiet,
    heSoHocPhan,
  };
  try {
    const { data } = await baseApi.post<CourseType>('/hocphan', newCourse);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Update operation
export const updateCourse = async (
  id: number,
  {
    maHP,
    tenHP,
    soTinChi,
    soTietLyThuyet,
    soTietThucHanh,
    soTietThucTap,
    loaiHocPhan,
    tongSoTiet,
    heSoHocPhan,
  }: CourseType,
) => {
  try {
    const updateCourse: CourseType = {
      maHP,
      tenHP,
      soTinChi,
      soTietLyThuyet,
      soTietThucHanh,
      soTietThucTap,
      loaiHocPhan,
      tongSoTiet,
      heSoHocPhan,
    };
    const { data } = await baseApi.put<CourseType>(`/hocphan/${id}`, updateCourse);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Delete operation
export const deleteCourse = async (id: number) => {
  try {
    const { data } = await baseApi.delete<CourseType>(`/hocphan/${id}`);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getKeHoachDayHocAPI = async () => {
  try {
    const { data } = await baseApi.get<
      {
        idChuyenNganh: number;
        tenChuyenNganh: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        idHocKy: any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        hocPhanList: any[];
      }[]
    >('/kehoachdayhoc');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addKeHoachDayHocAPI = async () => {
  try {
    const { data } = await baseApi.post('/kehoachdayhoc');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getThongTinChung = async () => {
  try {
    const { data } = await baseApi.get<IThongTinChungDataType[]>('/thongtinchung');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Lỗi khi lấy thông tin chung.');
  }
};

export const addThongTinChung = async ({
  dataThongTinChung, // Đã sửa lại chính tả
}: {
  dataThongTinChung: IThongTinChungDataType;
}) => {
  try {
    const { data } = await baseApi.post<IThongTinChungDataType>(
      `/thongtinchung`, // Sửa đường dẫn API cho đúng format
      dataThongTinChung,
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Lỗi khi thêm thông tin chung.');
  }
};

export const editThongTinChung = async ({
  idThongTin,
  newData,
}: {
  idThongTin: number;
  newData: IThongTinChungDataType;
}) => {
  try {
    const { data } = await baseApi.put<IThongTinChungDataType>(
      `/thongtinchung/${idThongTin}`, // Sửa đường dẫn API cho đúng format
      newData,
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Lỗi khi cập nhật thông tin chung.');
  }
};

export const deleteThongTinChung = async ({ idThongTin }: { idThongTin: number }) => {
  try {
    const { data } = await baseApi.delete<IThongTinChungDataType>(
      `/thongtinchung/${idThongTin}`, // Sửa đường dẫn API cho đúng format
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Lỗi khi xoá thông tin chung.');
  }
};
