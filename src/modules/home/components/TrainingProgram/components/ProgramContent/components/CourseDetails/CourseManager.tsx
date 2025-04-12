import React from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DialogAddCourse from "./components/DialogAddCourse";

export default function CourseManager() {
    // Dữ liệu mẫu cho bảng
    const courses = [
        { id: 1, name: "Giới thiệu Lý luận chính trị", instructor: "Nguyen Van A" },
        { id: 2, name: "Triết học Mác - Lênin", instructor: "Tran Thi B" },
        { id: 3, name: "Kinh tế chính trị", instructor: "Le Van C" },
    ];

    return (
        <div className=" bg-white p-4">

            <h1 className="text-4xl font-bold mb-6">Lý luận chính trị</h1>


            <div className="space-y-4">
                <div className=" flex justify-around items-center">
                    <div className="flex items-center space-x-4">
                    </div>
                    <div className="flex items-center space-x-4">
                        <DialogAddCourse />
                        <Button variant="outline" className=" mx-2 cursor-pointer bg-gray-700 text-white hover:bg-gray-800">
                            Lưu
                        </Button>
                    </div>

                </div>
                <div>
                    <span className="my-8 block text-2xl">Danh sách các học phần trong khối</span>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">ID</TableHead>
                                <TableHead>Tên học phần</TableHead>
                                <TableHead>Giảng viên</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.id}</TableCell>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.instructor}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}