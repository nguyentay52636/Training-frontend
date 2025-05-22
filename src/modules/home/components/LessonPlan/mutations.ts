import { deleteKeHoachDayHocAPI, editThongTinChung } from '@/lib/apis/CourseApi';
import { IThongTinChungDataType } from '@/lib/apis/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteKeHoachDayHoc = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['delete-ke-hoach-day-hoc'],
    mutationFn: async (idThongTin: number) => {
      try {
        const data = await deleteKeHoachDayHocAPI(idThongTin);
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

export const useEditKeHoachDayHoc = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['Edit-thong-tin-chung'],
    mutationFn: async ({ id, newData }: { id: number; newData: IThongTinChungDataType }) => {
      try {
        const data = await editThongTinChung({ idThongTin: id, newData });
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

export const useAddKeHoachDayHOc = () => {};
