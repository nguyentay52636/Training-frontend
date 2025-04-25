import { getAllUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTeacherQuery = () => {
  const handleGetALlTeacher = async () => {
    try {
      const data = await getAllUserAPI();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ['teachers'],
    queryFn: handleGetALlTeacher,
  });

  return query;
};
