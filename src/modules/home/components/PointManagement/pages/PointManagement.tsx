import { Input } from "@/components/ui/input";
import { Filter, RefreshCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOptionsDropdownMenu from "../../ManagerLecturer/components/SearchOptionsDropdownMenu";
import PointTable from "../components/PointTable/PointTable";
import DialogAddPoint from "../components/DialogAddPoint";
import PaginationPoint from "../components/PaginationPoint";
import ExportExcel from "../components/ExportExcel";
import { useState, useEffect } from "react";
import { PointType } from "@/lib/apis/types";
import { getAllPoint } from "@/lib/apis/pointApi";

export default function PointManagement() {
    const [points, setPoints] = useState<PointType[]>([]);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const data = await getAllPoint();
                if (data) {
                    setPoints(data);
                }
            } catch (error) {
                console.error('Error fetching points:', error);
            }
        };

        fetchPoints();
    }, []);

    return (
        <div className="">
            {/* Title */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-blue-900 tracking-tight">Quản lý điểm</h1>
                <p className="text-sm text-gray-500 mt-2">
                    Quản lý điểm của sinh viên
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between py-6 bg-white rounded-xl shadow-md px-6 mb-6">
                {/* Search Input */}
                <div className="flex justify-center items-center">
                    <div className="relative w-full max-w-md mb-4 md:mb-0 mr-10">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            placeholder="Tìm kiếm sinh viên theo họ tên..."
                            className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-200"
                        />


                    </div>
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            className="w-full md:w-auto flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-md transition-all duration-200 mx-4"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            Làm mới
                        </Button>


                        <Button
                            className="w-full md:w-auto flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            <Filter className="w-5 h-5" />
                            Lọc
                        </Button>
                    </div>
                </div>

                {/* Buttons and Dropdown */}
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="flex gap-4">
                        <SearchOptionsDropdownMenu />
                        <ExportExcel points={points} />
                        <Button className="w-32 bg-green-700 hover:bg-green-800 text-white rounded-full shadow-md transition-all duration-200 flex items-center justify-center">
                            <X className="mr-2 h-4 w-4" />
                            Nhập Excel
                        </Button>
                        <DialogAddPoint />
                    </div>
                </div>
            </div>

            <PointTable />

            <PaginationPoint />
        </div>
    );
}