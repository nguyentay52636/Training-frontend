import { Button } from "@/components/ui/button";

import DialogAddCourse from "./components/DialogAddCourse";
import TableCourse from "./components/TableCourse";
import PaginationCourse from "./components/PaginationCourse";
import { useState, useEffect } from "react";

interface CourseType {
    idHocPhan?: number;
    maHP: string;
    tenHP: string;
    soTinChi: number;
    soTietLyThuyet: number;
    soTietThucHanh: number;
    soTietThucTap: number;
    tongSoTiet: number;
    loaiHocPhan: string | number;
    heSoHocPhan?: number;
}

interface KnowledgeData {
    idKienThuc: number;
    tenKienThuc: string;
    idHocPhan: number[];
    loaiHocPhan: string;
    hocPhanList: CourseType[];
}

interface CourseManagerProps {
    knowledgeData?: KnowledgeData;
}

export default function CourseManager({ knowledgeData }: CourseManagerProps = {}) {
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    const clickRowOpenCourse = (courseId: string) => {
        setSelectedCourseId(courseId);
    }

    useEffect(() => {
        console.log("Knowledge data in CourseManager:", knowledgeData);
    }, [knowledgeData]);

    return (
        <div className="bg-white p-4">
            <h1 className="text-4xl font-bold mb-6">{knowledgeData?.tenKienThuc || "Danh sách học phần"}</h1>

            <div className="space-y-4">
                <span className="my-8 block text-2xl">Danh sách các học phần trong khối</span>

                <div className="flex flex-1 items-center ml-4">
                    <div className="flex items-center space-x-4">
                        <DialogAddCourse />
                        <Button variant="outline" className="mx-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-800">
                            Lưu
                        </Button>
                    </div>
                </div>
                <div>
                    <TableCourse
                        onRowClick={clickRowOpenCourse}
                        courseData={knowledgeData?.hocPhanList || []}
                        knowledgeId={knowledgeData?.idKienThuc}
                    />

                    <div className="my-8">
                        <PaginationCourse />
                    </div>
                </div>
            </div>
        </div>
    );
}