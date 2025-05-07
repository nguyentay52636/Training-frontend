'use client';

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import DialogSelectKnowledge from "./components/DialogSelectKnowledge";
import DialogAddCourse from "./components/DialogAddCourse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableCourse from "./components/TableCourse";
import { getHocPhanByKienThucId } from "@/lib/apis/KnowsApi";
import { CourseType } from "@/lib/apis/types";
import { toast } from 'react-toastify';
import { PlusCircle, RefreshCw } from "lucide-react";

export default function CourseKnowledgeManager() {
    const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<number | null>(null);
    const [courseData, setCourseData] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    // Function to handle selecting a knowledge
    const handleKnowledgeSelect = useCallback(async (knowledgeId: number) => {
        setSelectedKnowledgeId(knowledgeId);
        await fetchCoursesByKnowledgeId(knowledgeId);
    }, []);

    // Function to fetch courses by knowledge ID
    const fetchCoursesByKnowledgeId = async (knowledgeId: number) => {
        if (!knowledgeId) return;

        try {
            setLoading(true);
            const data = await getHocPhanByKienThucId(knowledgeId);
            setCourseData(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Có lỗi xảy ra khi tải danh sách học phần");
            setCourseData([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to refresh the course data after adding new courses
    const handleCoursesAdded = useCallback(() => {
        if (selectedKnowledgeId) {
            fetchCoursesByKnowledgeId(selectedKnowledgeId);
            setRefreshTrigger(prev => prev + 1); // Increment trigger to cause a refresh
        }
    }, [selectedKnowledgeId]);

    // Handler for row click in the table
    const handleRowClick = (courseId: string) => {
        console.log("Selected course:", courseId);
        // Implement additional functionality if needed
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6">
                <Card className="shadow-md">
                    <CardHeader className="pb-4 border-b">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-bold text-blue-700">
                                Quản lý học phần theo kiến thức
                            </CardTitle>
                            <div className="flex space-x-3">
                                <DialogSelectKnowledge
                                    refreshTrigger={refreshTrigger}
                                    onKnowledgeSelect={handleKnowledgeSelect}
                                />
                                {selectedKnowledgeId && (
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                                        onClick={() => handleCoursesAdded()}
                                        disabled={loading}
                                    >
                                        <RefreshCw size={16} />
                                        {loading ? "Đang tải..." : "Làm mới dữ liệu"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {selectedKnowledgeId ? (
                            <div>
                                <div className="mb-4 flex justify-end">
                                    <DialogAddCourse
                                        preselectedKnowledgeId={selectedKnowledgeId}
                                        onCoursesAdded={handleCoursesAdded}
                                        triggerButton={
                                            <Button
                                                variant="outline"
                                                className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                                            >
                                                <PlusCircle size={16} />
                                                Thêm học phần
                                            </Button>
                                        }
                                    />
                                </div>
                                <TableCourse
                                    knowledgeId={selectedKnowledgeId}
                                    onRowClick={handleRowClick}
                                    courseData={courseData}
                                />
                            </div>
                        ) : (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-lg mb-2">Vui lòng chọn kiến thức để xem danh sách học phần</p>
                                <p className="text-sm">Sử dụng nút "Quản lý học phần theo kiến thức" để chọn kiến thức</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 