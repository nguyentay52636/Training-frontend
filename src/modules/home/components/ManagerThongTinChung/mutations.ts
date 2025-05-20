import { deleteThongTinChung } from '@/lib/apis/CourseApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteThongTinChung = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-thong-tin-chung'],
    mutationFn: async (idThongTin: number) => {
      try {
        const data = await deleteThongTinChung({ idThongTin });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['thong-tin-chung'],
      });
    },
  });

  return mutation;
};
