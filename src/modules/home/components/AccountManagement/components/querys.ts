import { searchUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUserQuery = ({ keyword }: { keyword: string }) => {
  const query = useQuery({
    queryKey: ['users', { keyword }],
    queryFn: async () => {
      try {
        const response = await searchUserAPI(keyword);
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        throw new Error(err);
      }
    },
  });

  return query;
};
