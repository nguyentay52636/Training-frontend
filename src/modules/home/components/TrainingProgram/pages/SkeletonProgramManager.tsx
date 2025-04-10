import React, { useState } from 'react';
import { ChevronDown, Plus, Save, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DialogAddBlockNow from '../components/ProgramContent/components/AddBlocKnowledge/DialogAddlbocknow';
import khoiKienThucData from '../components/ProgramContent/components/DataBlock';
import BlocknowledgeActions from '../components/ProgramContent/components/BlocknowledgeActions';

export default function SkeletonProgramManager() {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = (isOpen: boolean) => {
        if (!isOpen) {
            setOpen(false);
        }
    };
    return (
        <div className="p-6 bg-white text-gray-800">
            {/* Menu ngang trên cùng */}
            <div className="flex items-center mb-6 border-b-2 border-gray-200 pb-3 justify-around">
                <div className="font-bold text-[2.5rem]">
                    <h1>Thông tin chung</h1>
                </div>
                <div className="flex gap-8">
                    <Button
                        className="bg-green-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Sửa
                    </Button>
                    <Button
                        className="bg-red-600 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer"
                    >
                        <Trash2 className="mr-2 h-5 w-5" /> Xoá
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer"
                    >
                        <Save className="mr-2 h-5 w-5" /> Lưu
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-200 rounded-md h-20 ">
                        <TabsTrigger
                            value="general"
                            className="hover:bg-white! cursor-pointer"
                        >
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-300 hover:from-blue-700 hover:to-indigo-800 px-3 py-0.5 font-bold text-xl mx-2">1</div> <h1 className="font-bold text-xl">Thông tin chung</h1>
                        </TabsTrigger>

                        <TabsTrigger
                            value="objective"
                            title="2 Đề cương chi tiết"
                            className="hover:bg-white! cursor-pointer"

                        >
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-300 hover:from-blue-700 hover:to-indigo-800 px-2.5 py-0.5 font-bold text-xl mx-2">2</div> <h1 className="font-bold text-xl">Đề cương chi tiết</h1>
                        </TabsTrigger>

                        <TabsTrigger
                            className="hover:bg-white! cursor-pointer"
                            value="curriculum"
                            title="3 Nội dung chương trình"

                        >
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-300 hover:from-blue-700 hover:to-indigo-800 px-2.5 py-0.5 font-bold text-xl mx-2">3</div> <h1 className="font-bold text-xl">Danh mục khối kiến thức</h1>
                        </TabsTrigger>

                        <TabsTrigger
                            className="hover:bg-white! cursor-pointer"
                            value="schedule"
                            title="4 Kế hoạch dạy học"

                        >
                            <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-300 hover:from-blue-700 hover:to-indigo-800 px-2.5 py-0.5 font-bold text-xl mx-2">4</div> <h1 className="font-bold text-xl">Kế hoạch dạy học</h1>
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab Content: Thông tin chung */}
                    <TabsContent value="general">
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">Thông tin chung</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Tên chương trình:</Label>
                                    <Input
                                        type="text"
                                        className="mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                        defaultValue="Ghị chu cạc Cao đẳng Đại Học Thạc sĩ"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Bậc:</Label>
                                        <div className="relative">
                                            <select
                                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none"
                                            >
                                                <option value="cao-dang">Cao đẳng</option>
                                                <option value="dai-hoc">Đại học</option>
                                                <option value="thac-si">Thạc sĩ</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Thời gian:</Label>
                                        <Input
                                            type="text"
                                            className="mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            defaultValue="4.5 năm"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Loại bằng:</Label>
                                        <div className="relative">
                                            <select
                                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none"
                                            >
                                                <option value="ky-su">Kỹ sư</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Số tín:</Label>
                                        <Input
                                            type="text"
                                            className="mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            defaultValue="155"
                                        />
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Khoa quản lý:</Label>
                                        <Input
                                            type="text"
                                            className="mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                                            defaultValue="CNTT"
                                        />
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Ngôn ngữ:</Label>
                                        <div className="relative">
                                            <select
                                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none"
                                            >
                                                <option value="tieng-viet">Tiếng Việt</option>
                                                <option value="tieng-anh">Tiếng Anh</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Loại hình đào tạo:</Label>
                                        <div className="relative">
                                            <select
                                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none"
                                            >
                                                <option value="chinh-quy">Chính quy</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700">Năm:</Label>
                                        <div className="mt-2 flex space-x-4">
                                            {[2023, 2024, 2025, 2026].map((year) => (
                                                <div key={year} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={year === 2023}
                                                        className="mr-2 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-gray-700">{year}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Mục tiêu đào tạo với thanh ngang và textarea có legend */}
                    <TabsContent value="objective">
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4">
                                    <CardTitle className="text-2xl font-bold text-gray-800">Đề cương chi tiết</CardTitle>
                                    <div className="space-x-2">
                                        <Button variant="outline" className="text-indigo-600 hover:bg-indigo-100">
                                            Sửa
                                        </Button>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                            Lưu
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <fieldset className="border border-gray-300 rounded-lg p-1">
                                    <legend className="text-sm font-medium text-gray-700 px-2">Mô tả</legend>
                                    <textarea
                                        className="w-full h-64 p-4 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 resize-none"
                                        placeholder="Nhập nội dung đề cương chi tiết tại đây..."
                                    />
                                </fieldset>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Nội dung chương trình */}
                    <TabsContent value="curriculum">
                        <Card className="border-gray-200 shadow-sm py-12">

                            <CardContent>
                                <div className="flex justify-between space-x-4 mb-4">
                                    <div className="">  <CardTitle className="text-2xl font-bold text-gray-800">Nội dung chương trình</CardTitle></div>
                                    <div className="flex justify-center items-center">
                                        <DialogAddBlockNow />
                                    </div>
                                </div>
                                <div className="border-t border-gray-300 mb-4"></div>
                                <div className="space-y-4">
                                    {/* <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-700">Danh mục khối kiến thức</h3>
                                    </div> */}
                                    <div className='w-full'>
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-blue-300! ">
                                                    <TableHead className="text-bold">STT</TableHead>
                                                    <TableHead className="text-bold">Tên khối kiến thức </TableHead>
                                                    <TableHead className=''>Thao tác  </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {khoiKienThucData.map(({ idKhoiKienThuc, tenKhoiKienThuc }) => (
                                                    <TableRow key={idKhoiKienThuc} className='bg-background hover:bg-secondary'>
                                                        <TableCell className='font-medium'>{idKhoiKienThuc}</TableCell>
                                                        <TableCell className='font-medium'>{tenKhoiKienThuc}</TableCell>
                                                        <TableCell>
                                                            <BlocknowledgeActions />
                                                        </TableCell>
                                                    </TableRow>
                                                )

                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Content: Kế hoạch dạy học */}
                    <TabsContent value="schedule">
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">Kế hoạch dạy học</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Kế hoạch dạy học sẽ được thêm vào đây.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Nút điều hướng */}
                <div className="flex justify-end mt-6 space-x-4">
                    <Button variant="outline" className="text-indigo-600 hover:bg-indigo-100">Sửa</Button>
                    <Button variant="outline" className="text-indigo-600 hover:bg-indigo-100">Xóa</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Lưu</Button>
                </div>
            </div>
        </div >
    );
}