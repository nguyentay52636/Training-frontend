import { getKeHoachDayHocAPI } from '@/lib/apis/CourseApi';
import { getAllHocKyAPI } from '@/lib/apis/HocKyApi';
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

export const useGetAllHocKy = () => {
  const query = useQuery({
    queryKey: ['hoc-ky'],
    queryFn: async () => {
      try {
        const data = await getAllHocKyAPI();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};
