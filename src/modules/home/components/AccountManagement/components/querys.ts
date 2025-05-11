import { getAllUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUserQuery = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await getAllUserAPI();
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        throw new Error(err);
      }
    },
  });

  return query;
};
