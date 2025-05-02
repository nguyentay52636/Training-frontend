import baseApi from "./baseApi";

export const getKnows = async () => {
   try{
    const {data} = await baseApi.get('/kien-thuc')
    return data
   }catch(error){
    throw new Error(error as string)
   }
};



