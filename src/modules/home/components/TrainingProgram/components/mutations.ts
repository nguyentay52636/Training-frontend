import { deleteKhungChuongTrinh } from '@/lib/apis/trainningPlanApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteStudySectionMutation = (id: number) => {
  const queryClinet = useQueryClient();

  const handleDeleteStudySection = async () => {
    try {
      const data = await deleteKhungChuongTrinh({ id });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationKey: ['delete-section'],
    mutationFn: handleDeleteStudySection,
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ['khung chuong trinh'],
      });
    },
  });

  return mutation;
};
