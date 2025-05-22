import { deleteChuyenNganh } from '@/lib/apis/ChuyenNganhApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteChuyenNganh = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['xoa-chuyen-nganh'],
    mutationFn: async (idChuyenNganh: number) => {
      try {
        const data = await deleteChuyenNganh(idChuyenNganh);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ke-hoach-day-hoc'],
      });
    },
  });
  return mutation;
};
