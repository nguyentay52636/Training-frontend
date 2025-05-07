import baseApi from "./baseApi"
import { CourseType } from "./types"

// Read operations
export const getAllCourse = async () => { 
    try { 
        const {data} = await baseApi.get<CourseType[]>('/hocphan')
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCourseById = async (id: number) => {
    try {
        const {data} = await baseApi.get<CourseType>(`/hocphan/${id}`)
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}


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
    heSoHocPhan
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
        heSoHocPhan
    }
    try {
        const {data} = await baseApi.post<CourseType>('/hocphan', newCourse)
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}

// Update operation
export const updateCourse = async (id: number, course: CourseType) => {
    try {
        const {data} = await baseApi.put<CourseType>(`/hocphan/${id}`, course)
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}

// Delete operation
export const deleteCourse = async (id: number) => {
    try {
        const {data} = await baseApi.delete<CourseType>(`/hocphan/${id}`)
        return data
    } catch (error) {
        throw new Error(error as string)
    }
}