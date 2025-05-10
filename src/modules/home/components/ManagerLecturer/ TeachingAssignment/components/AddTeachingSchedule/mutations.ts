import { deletePhanCongGiangDay } from '@/lib/apis/KnowsApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export const useDeletePhanCongGiangDayMutation = () => {
  const queryClinet = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-phongconggiangdya'],
    mutationFn: async (id: number) => {
      try {
        const data = await deletePhanCongGiangDay(id);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ['phanc cong giang day'],
      });
    },
  });

  return mutation;
};
