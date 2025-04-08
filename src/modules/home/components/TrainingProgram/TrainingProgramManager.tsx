
import { Edit, Trash, Save, Info } from "lucide-react";

export default function TrainingProgramManager() {
    return (
        <div className="min-h-screen bg-white p-6">
            {/* Tiêu đề và nút hành động */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Khung chương trình đào tạo</h1>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-200 to-indigo-700 hover:from-blue-300 hover:to-indigo-800 transition-all">
                        <Edit className="w-5 h-5" />
                        Sửa
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-200 to-indigo-700 hover:from-blue-300 hover:to-indigo-800 transition-all">
                        <Trash className="w-5 h-5" />
                        Xóa
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-200 to-indigo-700 hover:from-blue-300 hover:to-indigo-800 transition-all">
                        <Save className="w-5 h-5" />
                        Lưu
                    </button>
                </div>
            </div>

            {/* Tabs điều hướng */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-2 text-indigo-600 border-b-2 border-indigo-600 font-semibold">
                    Thông tin chung
                </button>
                <button className="pb-2 text-gray-600 hover:text-indigo-600 transition-all">
                    Mục tiêu đào tạo
                </button>
                <button className="pb-2 text-gray-600 hover:text-indigo-600 transition-all">
                    Nội dung chương trình
                </button>
                <button className="pb-2 text-gray-600 hover:text-indigo-600 transition-all">
                    Kế hoạch dạy học
                </button>
            </div>

            {/* Form nhập liệu */}
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-sm">
                {/* Cột 1 */}
                <div className="space-y-4">
                    {/* Tên chương trình */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên chương trình:</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="dang text"
                        />
                    </div>

                    {/* BẮC */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">BẮC:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>---</option>
                            <option>Cao đẳng</option>
                            <option>Đại học</option>
                            <option>Thạc sĩ</option>
                        </select>
                    </div>

                    {/* Ghi chú các bậc */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ghi chú các bậc:</label>
                        <textarea
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={3}
                            placeholder="Ghi chú..."
                        />
                    </div>

                    {/* Loại bằng */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loại bằng:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Chính quy</option>
                            <option>Không chính quy</option>
                        </select>
                    </div>

                    {/* Loại hình đào tạo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loại hình đào tạo:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>CNTT</option>
                            <option>Kinh tế</option>
                            <option>Ngôn ngữ Anh</option>
                        </select>
                    </div>
                </div>

                {/* Cột 2 */}
                <div className="space-y-4">
                    {/* Khóa tuyển */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Khóa tuyển:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>2023X</option>
                            <option>2024X</option>
                            <option>2025X</option>
                            <option>2026X</option>
                        </select>
                    </div>

                    {/* Thời gian */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thời gian:</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            defaultValue="4.5 năm"
                        />
                    </div>

                    {/* Số tín */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số tín:</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            defaultValue="155"
                        />
                    </div>

                    {/* Khóa quản lý */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Khóa quản lý:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Tiếng Việt</option>
                            <option>Tiếng Anh</option>
                        </select>
                    </div>

                    {/* Ngôn ngữ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngôn ngữ:</label>
                        <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Tiếng Anh</option>
                            <option>Tiếng Việt</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Chú thích */}
            <div className="mt-4 flex items-center gap-2 p-2 bg-yellow-100 rounded-lg">
                <Info className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">Có thể chọn nhiều combobox cùng 1 lúc</p>
            </div>
        </div>
    );
}