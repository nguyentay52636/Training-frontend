import { getLectureAPI } from '@/lib/apis/lectureApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTeacherQuery = () => {
  const handleGetALlTeacher = async () => {
    try {
      const data = await getLectureAPI();
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
