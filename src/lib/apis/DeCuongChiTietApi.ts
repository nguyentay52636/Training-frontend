import baseApi from "./baseApi";

export interface DeCuongChiTiet { 
    id?: number;
    mucTieu : string;
    idHocPhan? : number
    hocPhan? : number ; 
} 
export const getAllDeCuongChiTietAPI = async () => { 
    try { 
        const {data} = await baseApi.get<DeCuongChiTiet[]>('/decuongchitiet');
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
} 
export const addDeCuongChiTietAPI = async ( { mucTieu ,idHocPhan}: DeCuongChiTiet) => { 
    try { 
        const newDeCuong  : DeCuongChiTiet = {
            mucTieu,
            idHocPhan
        }
        const {data} = await baseApi.post<DeCuongChiTiet>('/decuongchitiet', newDeCuong);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
} 
export const updateDeCuongChiTietAPI = async (id: number, deCuongChiTiet: DeCuongChiTiet) => { 
    try { 
        const {data} = await baseApi.put<DeCuongChiTiet>(`/decuongchitiet/${id}`, deCuongChiTiet);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
} 

export const deleteDeCuongChiTietAPI = async (id: number) => { 
    try { 
        const {data} = await baseApi.delete<DeCuongChiTiet>(`/decuongchitiet/${id}`);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
} 

export const getDeCuongChiTietByIdAPI = async (id: number) => { 
    try { 
        const {data} = await baseApi.get<DeCuongChiTiet>(`/decuongchitiet/${id}`);
        return data;
    } catch (error) {
        throw new Error(error as string);
    }
} 
