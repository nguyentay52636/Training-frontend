import baseApi from "./baseApi";
import { ChuyenNganhType } from "./types";

export const getAllChuyenNganh = async ()=> {
try {
    const {data} = await baseApi.get('/kehoachdayhoc')
    return data
}catch (error : any ) { 
    throw new Error(error);  
}
 }
 export const getChuyenNganhById = async (id: number)=> {  
    try { 
        const {data} = await baseApi.get(`/kehoachdayhoc/${id}`)
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
 } 
 export const addChuyenNganh = async ({tenChuyenNganh,idHocKy}: ChuyenNganhType)=> {  
    try { 
        const  ChuyenNganhMoi : ChuyenNganhType = { 
            tenChuyenNganh,
            idHocKy
        }
        const {data} = await baseApi.post('/kehoachdayhoc',ChuyenNganhMoi)
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
 } 
 export const updateChuyenNganh = async ({idChuyenNganh,tenChuyenNganh,idHocKy}: ChuyenNganhType)=> {  
    try { 

        const {data} = await baseApi.put(`/kehoachdayhoc/${idChuyenNganh}`,{tenChuyenNganh,idHocKy})
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
  } 
  export const deleteChuyenNganh = async (id: number)=> {  
    try { 
        const {data} = await baseApi.delete(`/kehoachdayhoc/${id}`)
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
  } 

  export const themHocKyVaoChuyenNganh = async (idChuyenNganh: number, idHocPhan: number) => { 
    try { 
        const {data} = await baseApi.post(`/kehoachdayhoc/${idChuyenNganh}/hocky`, {idHocPhan})
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
   }
   export const xoaHocKyKhoiChuyenNganh = async (idChuyenNganh: number, idHocKy: number) => {  
    try { 
        const {data} = await baseApi.delete(`/kehoachdayhoc/${idChuyenNganh}/hocky/${idHocKy}`)
        return data
    } catch (error : any ) { 
        throw new Error(error);  
    }
   }