import { getThongTinChung } from '@/lib/apis/CourseApi';
import { useQuery } from '@tanstack/react-query';

export const useGetThongTInChung = () => {
  const query = useQuery({
    queryKey: ['thong-tin-chung'],
    queryFn: async () => {
      try {
        const data = await getThongTinChung();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};
