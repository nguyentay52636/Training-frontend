import { Search, Filter, RefreshCw, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerDefault() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
            {/* Tiêu đề và nút tạo mới */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="text-center md:text-left w-full md:w-auto">
                    <h1 className="text-4xl font-bold text-blue-900 tracking-tight leading-tight">
                        Chào mừng đến với Quản lý Chương trình Đào tạo
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Dễ dàng tạo, tìm kiếm và quản lý các chương trình đào tạo của bạn!
                    </p>
                </div>
                <Button
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    Tạo Chương trình Mới
                </Button>
            </div>

            {/* Thanh tìm kiếm, lọc và làm mới */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Ô tìm kiếm */}
                <div className="relative flex-1 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm chương trình đào tạo..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-base transition-all duration-200 placeholder-gray-400"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Dropdown trạng thái */}
                <div className="relative w-full md:w-48">
                    <select className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-base transition-all duration-200 bg-white text-gray-700">
                        <option value="">Chọn trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

           
                <Button
                    variant="outline"
                    className="w-full md:w-auto flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-md transition-all duration-200"
                >
                    <RefreshCw className="w-5 h-5" />
                    Làm mới
                </Button>


                <Button
                    className="w-full md:w-auto flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    <Filter className="w-5 h-5" />
                    Lọc
                </Button>
            </div>

            {/* Phần giới thiệu */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-4xl mx-auto">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 mx-auto text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bắt đầu quản lý chương trình đào tạo</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Đây là nơi bạn có thể tạo, chỉnh sửa và theo dõi các chương trình đào tạo. Hãy bắt đầu bằng cách thêm chương trình đầu tiên hoặc tìm kiếm chương trình hiện có!
                </p>
                <Button
                    className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl px-8 py-3 shadow-md transition-all duration-200 transform hover:scale-105"
                >
                    <Edit className="w-5 h-5 mr-2" />
                    Chỉnh sửa Ngay
                </Button>
            </div>
        </div>
    );
}