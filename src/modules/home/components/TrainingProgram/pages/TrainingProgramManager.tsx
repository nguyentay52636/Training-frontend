import { Search, Filter, RefreshCw, Plus, Edit } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { trainingPrograms } from "../components/DataThongTinChung";

export default function TrainingProgramManager() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
                    Chương trình đào tạo
                </h1>
                <button
                    onClick={() =>
                        navigate("/trangchu/chuong-trinh-dao-tao/khung-chuong-trinh/")
                    }
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
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
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
                    <RefreshCw className="w-5 h-5" />
                    Làm mới
                </button>

                <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <Filter className="w-5 h-5" />
                    Lọc
                </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                {trainingPrograms.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Tên chương trình</th>
                                    <th className="px-4 py-2 text-left">Bậc</th>
                                    <th className="px-4 py-2 text-left">Loại bằng</th>
                                    <th className="px-4 py-2 text-left">Loại hình đào tạo</th>
                                    <th className="px-4 py-2 text-left">Thời gian</th>
                                    <th className="px-4 py-2 text-left">Số tín chỉ</th>
                                    <th className="px-4 py-2 text-left">Khoa quản lý</th>
                                    <th className="px-4 py-2 text-left">Ngôn ngữ</th>
                                    <th className="px-4 py-2 text-left">Khóa tuyển</th>
                                    <th className="px-4 py-2 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trainingPrograms.map((program) => (
                                    <tr
                                        key={program.idThongTinChung}
                                        className="border-b hover:bg-gray-100"
                                    >
                                        <td className="px-4 py-2">{program.idThongTinChung}</td>
                                        <td className="px-4 py-2">{program.tenChuongTrinh}</td>
                                        <td className="px-4 py-2">{program.bac}</td>
                                        <td className="px-4 py-2">{program.loaiBang}</td>
                                        <td className="px-4 py-2">{program.loaiHinhDaoTao}</td>
                                        <td className="px-4 py-2">{program.thoiGian}</td>
                                        <td className="px-4 py-2">{program.soTinChi}</td>
                                        <td className="px-4 py-2">{program.khoaQuanLy}</td>
                                        <td className="px-4 py-2">{program.ngonNgu}</td>
                                        <td className="px-4 py-2">{program.khoaTuyen}</td>
                                        <td className="px-4 py-2">
                                            <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-white border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all cursor-pointer">
                                                <Edit className="w-5 h-5" />
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">
                            Không có chương trình đào tạo nào để hiển thị
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}