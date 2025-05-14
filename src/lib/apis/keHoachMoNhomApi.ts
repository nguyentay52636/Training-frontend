import baseApi from "./baseApi"
import { KeHoachMoNhomType } from "./types"

export const  getAllKeHoachMoNhom = async () => { 
try {
    const {data} = await baseApi.get<KeHoachMoNhomType[]>('/kehoachmonhom')
    return data
}catch(error) { 
    throw new Error(error as string)
}
} 
export const createKeHoachMoNhom = async({namHoc,soNhom}:KeHoachMoNhomType)=> {
try {
    const {data} = await baseApi.post<KeHoachMoNhomType>('/kehoachmonhom',{namHoc,soNhom})
    return data
}catch(error)  {
    throw new Error(error as string)
}
}
export const updateKeHoachMoNhom = async (id:number , {namHoc,soNhom}:KeHoachMoNhomType)=> {
try {
 const {data} = await baseApi.put<KeHoachMoNhomType>(`/kehoachmonhom/${id}`,{namHoc,soNhom})
 return data
} catch (error) {
    throw new Error(error as string)
}
}
export const deleteKeHoachMoNhom = async (id:number)=> {
try {
    const {data} = await baseApi.delete<KeHoachMoNhomType>(`/kehoachmonhom/${id}`)
    return data
} catch (error) {
    throw new Error(error as string)
}
 } 
 export const getKeHoachMoNhomById = async (id:number)=> { 
try {
    const {data} = await baseApi.get<KeHoachMoNhomType>(`/kehoachmonhom/${id}`)
    return data
} catch (error) {
    throw new Error(error as string)
}
 } 
 
