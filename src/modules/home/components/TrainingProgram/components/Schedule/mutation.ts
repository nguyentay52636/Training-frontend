import { deleteChuyenNganh } from '@/lib/apis/ChuyenNganhApi';
import { themHocPhanVaoHocKy, themHocKyVaoChuyenNganh } from '@/lib/apis/HocKyApi';
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

export const useThemHocPhanVaoHocKy = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['them-hoc-phan-vao-hoc-ky'],
    mutationFn: async ({ idHocKy, idHocPhan }: { idHocKy: number; idHocPhan: number }) => {
      try {
        const data = await themHocPhanVaoHocKy(idHocKy, idHocPhan);
        return data;
      } catch (error) {
        throw error;
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

export const useThemHocKyVaoChuyenNganh = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['them-hoc-ky-vao-chuyen-nganh'],
    mutationFn: async (idChuyenNganh: number) => {
      try {
        const data = await themHocKyVaoChuyenNganh(idChuyenNganh);
        return data;
      } catch (error) {
        throw error;
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
