
import { Search, Filter, RefreshCw, Plus, Edit } from "lucide-react";

export default function ManagerDefault() {
    return (
        <div className="min-h-screen bg-white p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Chương trình đào tạo</h1>
                <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-200 to-indigo-700 hover:from-blue-300 hover:to-indigo-800 transition-all">
                    <Plus className="w-5 h-5" />
                    Tạo chương trình đào tạo
                </button>
            </div>


            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                {/* Ô tìm kiếm */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Dropdown trạng thái */}
                <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Trạng thái</option>
                        <option>Nhập từ khóa tại đây...</option>
                        <option>Chọn trạng thái</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
                    <RefreshCw className="w-5 h-5" />
                    Làm mới
                </button>


                <button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-200 to-indigo-700 rounded-lg hover:from-blue-300 hover:to-indigo-800 transition-all">
                    <Filter className="w-5 h-5" />
                    Lọc
                </button>
            </div>


            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Tên chương trình:</h2>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all">
                        <Edit className="w-5 h-5" />
                        nút này để xem chi tiết (giúp t)
                    </button>
                </div>


                <div className="text-center py-10">
                    <p className="text-gray-500">Không có chương trình đào tạo nào để hiển thị</p>
                </div>
            </div>
        </div>
    );
}