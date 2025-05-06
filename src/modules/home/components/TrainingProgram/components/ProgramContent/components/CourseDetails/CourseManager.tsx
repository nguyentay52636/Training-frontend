import { Button } from "@/components/ui/button";

import DialogAddCourse from "./components/DialogAddCourse";
import TableCourse from "./components/TableCourse";
import PaginationCourse from "./components/PaginationCourse";
import { useState, useEffect } from "react";
import { knowledgeType, CourseType } from "@/lib/apis/types";
import { updateKnowByCourse, getKnowledgeById, getHocPhanByKienThucId } from "@/lib/apis/KnowsApi";
import { toast } from 'react-toastify';

interface CourseManagerProps {
    knowledgeData?: knowledgeType;
}

export default function CourseManager({ knowledgeData }: CourseManagerProps = {}) {
    const idKienThuc = knowledgeData?.idKienThuc;
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
    
    // Lấy danh sách học phần khi component mount hoặc khi idKienThuc thay đổi
    useEffect(() => {
        if (!idKienThuc) return;
        
        const fetchCourses = async () => {
            try {
                setLoading(true);
                // Lấy danh sách học phần từ API
                const courses = await getHocPhanByKienThucId(idKienThuc);
                setSelectedCourses(courses);
                
                // Lấy danh sách ID học phần
                const courseIds = courses
                    .filter(course => course.idHocPhan !== undefined)
                    .map(course => course.idHocPhan as number);
                setSelectedCourseIds(courseIds);
            } catch (error: any) {
                console.error("Lỗi khi lấy danh sách học phần:", error.message || error);
                toast.error("Có lỗi xảy ra khi lấy danh sách học phần!");
            } finally {
                setLoading(false);
            }
        };
        
        fetchCourses();
    }, [idKienThuc, refreshKey]);

    // Xử lý khi click vào một hàng trong bảng học phần
    const handleRowClick = (courseId: string) => {
        // Có thể thêm xử lý chi tiết nếu cần
        console.log("Đã chọn học phần:", courseId);
    };
    
    // Xử lý khi học phần được thêm thành công từ DialogAddCourse
    const handleCoursesAdded = () => {
        // Refresh danh sách học phần
        setRefreshKey(prev => prev + 1);
        toast.success("Đã thêm học phần thành công!");
    };

    // Xử lý lưu kiến thức
    const handleSaveKnowledge = async () => {
        if (!idKienThuc) {
            toast.error("Không tìm thấy ID kiến thức!");
            return;
        }

        try {
            setLoading(true);
            // Lấy thông tin kiến thức hiện tại
            const currentKnowledge = await getKnowledgeById(idKienThuc);
            
            // Tạo đối tượng cập nhật với danh sách học phần đã chọn
            const updateData = {
                tenKienThuc: currentKnowledge.tenKienThuc,
                idHocPhan: selectedCourseIds,
                loaiHocPhan: currentKnowledge.loaiHocPhan
            };
            
            // Gọi API cập nhật
            await updateKnowByCourse(idKienThuc, updateData);
            
            toast.success("Cập nhật kiến thức thành công!");
            // Refresh lại danh sách sau khi cập nhật
            setRefreshKey(prev => prev + 1);
        } catch (error: any) {
            console.error("Lỗi khi cập nhật kiến thức:", error.message || error);
            toast.error("Có lỗi xảy ra khi cập nhật kiến thức!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4">
            <h1 className="text-4xl font-bold mb-6">{knowledgeData?.tenKienThuc || "Danh sách học phần"}</h1>

            <div className="space-y-4">
                <span className="my-8 block text-2xl">Danh sách các học phần trong khối</span>

                <div className="flex flex-1 items-center ml-4">
                    <div className="flex items-center space-x-4">
                        <DialogAddCourse 
                            preselectedKnowledgeId={idKienThuc} 
                            onCoursesAdded={handleCoursesAdded}
                        />
                        <Button 
                            variant="outline" 
                            className="mx-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-800"
                            onClick={handleSaveKnowledge}
                            disabled={loading}
                        >
                            {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <TableCourse
                            onRowClick={handleRowClick}
                            courseData={selectedCourses || []}
                            knowledgeId={idKienThuc}
                        />
                    )}

                    <div className="my-8">
                        <PaginationCourse />
                    </div>
                </div>
            </div>
        </div>
    );
}