import { getKeHoachDayHocAPI } from '@/lib/apis/CourseApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllKeHoachDayHOcQuery = () => {
  const query = useQuery({
    queryKey: ['ke-hoach-day-hoc'],
    queryFn: async () => {
      try {
        const data = await getKeHoachDayHocAPI();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};
