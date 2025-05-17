import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { login } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginForm({ ...props }: React.ComponentProps<'div'>) {
  const { register, handleSubmit } = useForm<{ userName: string; password: string }>({
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (value: { userName: string; password: string }) => {
    try {
      await dispatch(login(value)).unwrap();
      toast.success('Đăng nhập thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/trangchu', {
        replace: true,
      });
    } catch (error) {
      toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center" {...props}>
      <div className="w-full max-w-lg ">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-center mb-3">Chào Mừng Trở Lại</h1>
        <p className="text-center text-gray-500 mb-8">
          Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
        </p>

        {/* Nút đăng nhập Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-6 hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
          Đăng Nhập Bằng Google
        </button>

        {/* Hoặc sử dụng email */}
        <div className="text-center text-gray-400 mb-6">Hoặc sử dụng email</div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              {...register('userName')}
              id="username"
              placeholder="Nhập email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Mật Khẩu
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Quên Mật Khẩu?
              </a>
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700 text-sm">Ghi Nhớ Tôi</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}
