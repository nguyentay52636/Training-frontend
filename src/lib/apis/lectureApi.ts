import baseApi from "./baseApi"

export const getLectureAPI = async () => { 
    try {
        const { data } = await baseApi.get('/giangvien/danhsach')
        return data
    } catch (error) {
        throw new Error(error as string)
    }
} 
export const getLectureByIdAPI = async (id: number) => {  
    
} 