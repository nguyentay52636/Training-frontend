import { addLectureAPI, deleteLectureAPI } from '@/lib/apis/lectureApi';
import { UserType } from '@/lib/apis/types';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveTeacherMutation = () => {
  const queryClient = useQueryClient();

  const handleRemoveTeacher = async (lectureId: number): Promise<UserType> => {
    try {
      const data = await deleteLectureAPI(lectureId);
      if (!data) {
        throw new Error('Failed to delete user');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: handleRemoveTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });

  return mutation;
};

export const useAddTeacherMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['add-giang-vien'],
    mutationFn: async (lecture: {
      maGiangVien: string;
      tenGiangVien: string;
      chucDanh: string;
      namPhong: string;
      trinhDo: string;
      nuoc: string;
      namTotNghiep: string;
    }) => {
      const data = await addLectureAPI(lecture);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teachers'],
      });
    },
  });

  return mutation;
};
