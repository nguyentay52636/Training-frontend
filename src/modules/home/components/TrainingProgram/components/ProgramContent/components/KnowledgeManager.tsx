'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DialogSelectKnowledge from "./CourseDetails/components/DialogSelectKnowledge";
import DialogAddCourse from "./CourseDetails/components/DialogAddCourse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKnows } from "@/lib/apis/KnowsApi";
import { knowledgeType } from "@/lib/apis/types";
import { toast } from 'react-toastify';
import { getLoaiHocPhanDisplay, getLoaiHocPhanBadgeColor } from "@/lib/utils/courseHelpers";

export default function KnowledgeManager() {
    const [knowledgeList, setKnowledgeList] = useState<knowledgeType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedKienThucId, setSelectedKienThucId] = useState<string | null>(null);

    useEffect(() => {
        fetchKnowledgeList();
    }, []);

    const fetchKnowledgeList = async () => {
        try {
            setLoading(true);
            const data = await getKnows();
            setKnowledgeList(data);
        } catch (error) {
            console.error("Error fetching knowledge list:", error);
            toast.error("Có lỗi xảy ra khi tải danh sách kiến thức");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-blue-700">Quản lý kiến thức và học phần</h1>
                <div className="flex flex-wrap gap-3">
                    <DialogSelectKnowledge />
                    <DialogAddCourse />
                    <Button
                        variant="outline"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                        onClick={fetchKnowledgeList}
                        disabled={loading}
                    >
                        {loading ? "Đang tải..." : "Làm mới dữ liệu"}
                    </Button>
                </div>
            </div>

            {/* Knowledge Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <Card className="shadow bg-blue-50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-blue-700">Tổng kiến thức</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{knowledgeList.length}</p>
                    </CardContent>
                </Card>

                <Card className="shadow bg-green-50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-green-700">Tổng học phần</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {knowledgeList.reduce((total, kienThuc) =>
                                total + (kienThuc.hocPhanList?.length || 0), 0
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow bg-purple-50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-purple-700">Loại học phần</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-3xl font-bold">
                                {new Set(knowledgeList.map(k => k.loaiHocPhan)).size}
                            </p>
                            <div className="flex gap-2 text-sm">
                                <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700">Tự chọn</span>
                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">Bắt buộc</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Knowledge List */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Danh sách kiến thức</h2>
            {loading ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">Đang tải dữ liệu...</p>
                </div>
            ) : knowledgeList.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">Không có dữ liệu kiến thức</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {knowledgeList.map((kienThuc) => (
                        <Card
                            key={kienThuc.idKienThuc}
                            className="shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader className="pb-2 border-b">
                                <CardTitle className="text-lg font-medium flex justify-between">
                                    <span>{kienThuc.tenKienThuc}</span>
                                    <span className={`text-sm font-normal px-2 py-1 rounded-full ${getLoaiHocPhanBadgeColor(kienThuc.loaiHocPhan)}`}>
                                        {getLoaiHocPhanDisplay(kienThuc.loaiHocPhan)}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <h3 className="font-medium mb-2 text-gray-700">Danh sách học phần:</h3>
                                {kienThuc.hocPhanList && kienThuc.hocPhanList.length > 0 ? (
                                    <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                                        {kienThuc.hocPhanList.map((hocPhan, index) => (
                                            <li key={index} className="p-2 bg-gray-50 rounded text-sm border border-gray-100">
                                                <div className="font-medium">{hocPhan.tenHP}</div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>Mã: {hocPhan.maHP}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span>{hocPhan.soTinChi} tín chỉ</span>
                                                        <span className={`px-1.5 py-0.5 rounded-full text-xs ${getLoaiHocPhanBadgeColor(hocPhan.loaiHocPhan)}`}>
                                                            {getLoaiHocPhanDisplay(hocPhan.loaiHocPhan)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Không có học phần</p>
                                )}

                                <div className="mt-4 text-right">
                                    <p className="text-sm text-gray-500">
                                        Tổng số: {kienThuc.hocPhanList?.length || 0} học phần
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 