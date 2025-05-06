import baseApi from "./baseApi";
import { knowledgeType } from "./types";

export const getKnows = async () => {
   try{
    const {data} = await baseApi.get('/kien-thuc')
    return data
   }catch(error){
    throw new Error(error as string)
   }
};

export const addKnow = async ({tenKienThuc,idHocPhan,loaiHocPhan}:knowledgeType): Promise<knowledgeType> => { 
   const newKnow : knowledgeType= { 
      tenKienThuc,
      idHocPhan,
      loaiHocPhan,
      hocPhanList: []
   }
   try{
    const {data} = await baseApi.post<knowledgeType>('/kien-thuc',newKnow)
    return data
   }catch(error){
    throw new Error(error as string)
   }
}
export const deleteKnow = async (id: number) => {  
   try{
    const {data} = await baseApi.delete(`/kien-thuc/${id}`)
    return data
   }catch(error){
    throw new Error(error as string)
   }
 } 
