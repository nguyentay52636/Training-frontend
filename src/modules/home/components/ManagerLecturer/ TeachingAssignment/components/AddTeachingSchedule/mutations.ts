import { editPhanCongGiangDay } from './../../../../../../../lib/apis/KnowsApi';
import { deletePhanCongGiangDay } from '@/lib/apis/KnowsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useEditPhanCongGiangDayMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['edit-phanconggiangday'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      try {
        const response = await editPhanCongGiangDay({ id, data });
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['phanc cong giang day'],
      });
    },
  });

  return mutation;
};
