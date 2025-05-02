import baseApi from "./baseApi"
import { BlockKnowType } from "./types"

export const getBlockKnows = async () => { 
  try { 
    const {data} = await baseApi.get<BlockKnowType[]>('/khoi-kien-thuc')
    return data
  } catch(error) {
    throw new Error(error as string)
  }
}
export const getBlockKnowById = async (id: number) => {
try {
 const {data} = await baseApi.get<BlockKnowType>(`/khoi-kien-thuc/${id}`)
 return data
}catch(error) { 
    throw new Error(error as string)
}
 } 
 export const addBlockKnow = async ({ tenKhoiKienThuc }: BlockKnowType) => {  
 try { 
    const  newBlockKnow  : BlockKnowType = { 
        tenKhoiKienThuc,
        idKienThuc: '',
        danhSachKienThuc:[]
     } 
    const {data} = await baseApi.post('/khoi-kien-thuc', newBlockKnow)
    return data
 }catch(error) { 
    throw new Error(error as string)
 }

 } 
 export const addKnowInBlockKnow = async (idBlockKnow: number, idKnow: number) => { 
    try { 
        const {data} = await baseApi.post(`/khoi-kien-thuc/${idBlockKnow}/kien-thuc/${idKnow}`)
        return data
    }catch(error) { 
        throw new Error(error as string)
    }
 } 
 export const deleteKnowInBlockKnow = async (idBlockKnow: number, idKnow: number) => { 
    try { 
        const {data} = await baseApi.delete(`/khoi-kien-thuc/${idBlockKnow}/kien-thuc/${idKnow}`)
        return data
    }catch(error) { 
        throw new Error(error as string)
    }
 } 
 export const deleteBlockKnow = async (id: number) => { 
  try { 
    const {data} = await baseApi.delete(`/khoi-kien-thuc/${id}`)
    return data
  }catch(error) { 
    throw new Error(error as string)
  }
 } 
 export const updateBlockKnow = async (id: number, {tenKhoiKienThuc, danhSachKienThuc }:BlockKnowType) => {  
  try { 
    const {data} = await baseApi.put(`/khoi-kien-thuc/${id}`, {tenKhoiKienThuc, danhSachKienThuc })
    return data
  }catch(error) { 
    throw new Error(error as string)
  }
 } 
 
