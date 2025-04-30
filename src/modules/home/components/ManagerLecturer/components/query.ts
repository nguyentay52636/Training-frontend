import { searchUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTeacherQuery = ({ keyword }: { keyword?: string }) => {
  const handleGetALlTeacher = async () => {
    try {
      const data = await searchUserAPI(keyword);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ['teachers', { keyword }],
    queryFn: handleGetALlTeacher,
  });

  return query;
};
