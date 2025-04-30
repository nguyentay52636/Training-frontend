import { LoginForm } from '@/components/login-form';
import { useAppSelector } from '@/redux/hooks/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/trangchu', {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-[url('https://thongtindaotao.sgu.edu.vn/assets/images/AQ1.png')] bg-no-repeat bg-right bg-cover"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
    >
      <div className='w-full flex justify-center'>
        <div className=' backdrop-blur-md rounded-2xl bg-white p-4 md:p-8 bg-'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
