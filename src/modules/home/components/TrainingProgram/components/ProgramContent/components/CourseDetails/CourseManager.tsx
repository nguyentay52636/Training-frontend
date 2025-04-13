import { Button } from "@/components/ui/button";

import DialogAddCourse from "./components/DialogAddCourse";
import TableCourse from "./components/TableCourse";
import PaginationCourse from "./components/PaginationCourse";
import { useState } from "react";

export default function CourseManager() {
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const clickRowOpenCourse = (courseId: string) => {
        setSelectedCourseId(courseId);
    }


    return (
        <div className=" bg-white p-4">

            <h1 className="text-4xl font-bold mb-6">Lý luận chính trị</h1>


            <div className="space-y-4">
                <span className="my-8 block text-2xl text-">Danh sách các học phần trong khối</span>

                <div className=" flex flex-1 items-center ml-4">

                    <div className="flex items-center space-x-4">
                        <DialogAddCourse />
                        <Button variant="outline" className=" mx-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-800">
                            Lưu
                        </Button>
                    </div>

                </div>
                <div>
                    <TableCourse onRowClick={clickRowOpenCourse} />

                    <div className="my-8 ">
                        <PaginationCourse />
                    </div>
                </div>
            </div>
        </div>
    );
}