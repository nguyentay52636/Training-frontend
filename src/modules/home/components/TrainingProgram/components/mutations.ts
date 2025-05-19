import { addThongTinChung } from '@/lib/apis/CourseApi';
import { deleteKhungChuongTrinh } from '@/lib/apis/trainningPlanApi';
import { IThongTinChungDataType } from '@/lib/apis/types';
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

export const useAddThongTinChungMutation = () => {
  const mutatin = useMutation({
    mutationFn: async (dataThongTinChung: IThongTinChungDataType) => {
      try {
        const data = await addThongTinChung({ dataThongTinChung });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return mutatin;
};
