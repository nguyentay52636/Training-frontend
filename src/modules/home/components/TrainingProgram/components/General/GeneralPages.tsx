
import { ChevronDown } from "lucide-react";

export default function GeneralPages() {
    return (
        <div
            className="min-h-screen p-6 bg-gradient-to-r from-blue-200 to-indigo-700 text-gray-800"
            style={{ backgroundAttachment: "fixed" }} // Tạo hiệu ứng gradient mượt mà
        >
            {/* Menu ngang trên cùng */}
            <div className="flex justify-start space-x-6 mb-8 border-b-2 border-indigo-300 pb-3">
                <button className="px-6 py-2 rounded-t-lg bg-white text-indigo-700 font-semibold shadow-md hover:bg-indigo-100 transition-all duration-200">
                    Thông tin chung
                </button>
                <button className="px-6 py-2 rounded-t-lg bg-transparent text-white hover:bg-white hover:text-indigo-700 font-medium transition-all duration-200">
                    Sửa
                </button>
                <button className="px-6 py-2 rounded-t-lg bg-transparent text-white hover:bg-white hover:text-indigo-700 font-medium transition-all duration-200">
                    Xóa
                </button>
                <button className="px-6 py-2 rounded-t-lg bg-transparent text-white hover:bg-white hover:text-indigo-700 font-medium transition-all duration-200">
                    Lưu
                </button>
            </div>

            {/* Nội dung chính */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
                <div className="space-y-6">
                    {/* Tên chương trình */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên chương trình:</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 placeholder-gray-400"
                            placeholder="Nhập tên chương trình"
                        />
                    </div>

                    {/* Ghi chú */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ghi chú:</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 placeholder-gray-400"
                            placeholder="Nhập ghi chú"
                        />
                    </div>

                    {/* Bậc đào tạo và Khóa tuyển */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bậc:</label>
                            <div className="relative mt-1">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 appearance-none bg-white"
                                >
                                    <option value="">Chọn bậc</option>
                                    <option value="DaiHoc">Đại học</option>
                                    <option value="ThacSi">Thạc sĩ</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Khóa tuyển:</label>
                            <div className="relative mt-1">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 appearance-none bg-white"
                                >
                                    <option value="">Chọn khóa</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Loại bằng, Số tín chỉ, Khoa quản lý */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Loại bằng:</label>
                            <div className="relative mt-1">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 appearance-none bg-white"
                                >
                                    <option value="">Chọn loại</option>
                                    <option value="Kysu">Kỹ sư</option>
                                    <option value="LoaiHinhDaoTao">Loại hình đào tạo</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số tín chỉ:</label>
                            <input
                                type="text"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 placeholder-gray-400"
                                placeholder="Nhập số tín chỉ"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Khoa quản lý:</label>
                            <div className="relative mt-1">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 appearance-none bg-white"
                                >
                                    <option value="">Chọn khoa</option>
                                    <option value="CNNT">CNNT</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Ngôn ngữ và Thời gian */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngôn ngữ:</label>
                            <div className="relative mt-1">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 appearance-none bg-white"
                                >
                                    <option value="">Chọn ngôn ngữ</option>
                                    <option value="TiengViet">Tiếng Việt</option>
                                    <option value="TiengAnh">Tiếng Anh</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thời gian:</label>
                            <input
                                type="text"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 placeholder-gray-400"
                                placeholder="Nhập thời gian"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}