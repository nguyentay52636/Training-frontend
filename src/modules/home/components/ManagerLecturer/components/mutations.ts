import { UserType } from '@/lib/apis/types';
import { deleteUserAPI } from '@/lib/apis/userApi';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveTeacherMutation = () => {
  const queryClient = useQueryClient();

  const handleRemoveTeacher = async (userId: number): Promise<UserType> => {
    try {
      const data = await deleteUserAPI(userId);
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
    onSuccess: (deletedUser: UserType) => {
      queryClient.cancelQueries();
      const queryFilter: QueryFilters = {
        queryKey: ['teachers'],
      };
      queryClient.setQueriesData<UserType[]>(queryFilter, (oldData) => {
        if (!oldData) return;
        return oldData.filter((user) => user.id !== deletedUser.id);
      });
    },
  });

  return mutation;
};
