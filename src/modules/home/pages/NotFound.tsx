import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-6 max-w-lg mx-auto">
                {/* Hình minh họa */}
                <img
                    src="https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-3-800x534.jpg"
                    alt="404 Illustration"
                    className="w-300 mx-auto mb-6 z-1"
                />
                {/* Tiêu đề */}
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                {/* Thông báo */}
                <p className="text-xl text-gray-600 mb-6">
                    Oops! Trang bạn tìm kiếm không tồn tại.
                </p>
                {/* Nút quay về */}
                <Link
                    to="/trangchu"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
}