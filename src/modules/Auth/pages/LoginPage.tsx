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
    <div className="flex min-h-screen">
      {/* Bên trái: Hình ảnh + slogan */}
      <div className="hidden md:flex flex-col justify-center items-start w-1/2 bg-gray-300 relative px-16">
        <img
          src="https://img.freepik.com/free-vector/abstract-soft-blue-watercolor-texture-design-background_1055-17547.jpg?semt=ais_hybrid&w=740"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className=" flex flex-col items-center justify-center z-10 text-center">
          <img src="/logosgu-removebg.png" alt="" className="text-white" />
          <h1 className="text-4xl font-bold text-black">
            Chào mừng bạn đến với quản lý của giảng viên SGU
          </h1>
        </div>
      </div>
      {/* Bên phải: Form login */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
