import baseApi from "./baseApi"
import { KeHoachMoNhomType } from "./types"
import { z } from "zod"

const formSchema = z.object({
    hocKy: z.number().min(1, "Học kỳ phải lớn hơn 0"),
    soLuongSinhVien: z.number().min(1, "Số lượng sinh viên phải lớn hơn 0"),
});

export const getAllKeHoachMoNhom = async () => { 
  try {
    const {data} = await baseApi.get<KeHoachMoNhomType[]>('/kehoachmonhom')
    return data
  } catch(error) { 
    throw new Error(error as string)
  }
}

export const createKeHoachMoNhom = async({ idHocPhan, namHoc, soNhom, hocKy, soLuongSinhVien}: KeHoachMoNhomType) => {
    try {
      const {data} = await baseApi.post<KeHoachMoNhomType>('/kehoachmonhom', {
        idHocPhan,
        namHoc, 
        soNhom, 
        hocKy, 
        soLuongSinhVien
      })
      return data
    } catch(error) {
      throw new Error(error as string)
    }
}

export const updateKeHoachMoNhom = async (id: number, {idHocPhan, namHoc, soNhom, soLuongSinhVien, hocKy}: KeHoachMoNhomType) => {
  try {
    const {data} = await baseApi.put<KeHoachMoNhomType>(`/kehoachmonhom/${id}`, {
      idHocPhan,
      namHoc, 
      soNhom, 
      soLuongSinhVien, 
      hocKy
    })
    return data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const deleteKeHoachMoNhom = async (id: number) => {
  try {
    const {data} = await baseApi.delete<KeHoachMoNhomType>(`/kehoachmonhom/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getKeHoachMoNhomById = async (id: number) => { 
  try {
    const {data} = await baseApi.get<KeHoachMoNhomType>(`/kehoachmonhom/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string)
  }
} 
