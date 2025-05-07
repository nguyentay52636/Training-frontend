import { getKHungChuongTrinh } from '@/lib/apis/trainningPlanApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllStudySectionQuery = () => {
  const getAllStudySection = async () => {
    try {
      const data = await getKHungChuongTrinh();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ['khung chuong trinh'],
    queryFn: getAllStudySection,
  });

  return query;
};
