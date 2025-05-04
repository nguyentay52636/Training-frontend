import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserAPI, registerAPI } from '@/lib/apis/userApi';
import { Role, UserType } from '@/lib/apis/types';

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userName,
      userEmail,
      password,
      role,
    }: {
      userName: string;
      userEmail: string;
      password: string;
      role: Role;
    }) => {
      try {
        const data = await registerAPI({ userName, userEmail, password, role });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.setQueryData<UserType[]>(
        ['users'], // Fix: Use array syntax for queryKey
        (oldData) => {
          if (!oldData) return [newUser];
          return [...oldData, newUser]; // Fix: Remove comma, use semicolon
        },
      );
    },
    onError: (error) => {
      console.error('Error adding user:', error);
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userID: number) => {
      try {
        const data = await deleteUserAPI(userID);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (_, deletedUserId) => {
      queryClient.setQueryData<UserType[]>(['users'], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((user) => user.id !== deletedUserId);
      });
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });
};
