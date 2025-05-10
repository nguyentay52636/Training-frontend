import { getAllPhanCongGiangDay } from '@/lib/apis/KnowsApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPhanCongGiangDayQuery = () => {
  const query = useQuery({
    queryKey: ['phanc cong giang day'],
    queryFn: async () => {
      try {
        const data = await getAllPhanCongGiangDay();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};
