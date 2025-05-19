import { useAppSelector } from '@/redux/hooks/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  return children;
}
