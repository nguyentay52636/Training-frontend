'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TableCourse from "./TableCourse";
import { getKnows } from "@/lib/apis/KnowsApi";
import { knowledgeType } from "@/lib/apis/types";
import { toast } from 'react-toastify';

export default function DialogSelectKnowledge() {
    const [knowledgeList, setKnowledgeList] = useState<knowledgeType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedKienThucId, setSelectedKienThucId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    // Fetch knowledge list when component mounts
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

    const handleRowClick = (courseId: string) => {
        console.log("Selected course:", courseId);
        // Implement additional functionality if needed
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
                    Quản lý học phần theo kiến thức
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Quản lý học phần theo kiến thức</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Chọn kiến thức để xem danh sách học phần
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4">
                    <Select
                        onValueChange={(value) => setSelectedKienThucId(Number(value))}
                        value={selectedKienThucId?.toString() || undefined}
                    >
                        <SelectTrigger className="w-full h-12 text-[1.1rem] text-black">
                            <SelectValue placeholder="Chọn kiến thức" />
                        </SelectTrigger>
                        <SelectContent>
                            {knowledgeList.map((kienThuc) => (
                                <SelectItem
                                    key={kienThuc.idKienThuc}
                                    value={kienThuc.idKienThuc?.toString() || ""}
                                >
                                    {kienThuc.tenKienThuc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedKienThucId && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">Danh sách học phần:</h3>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-green-600 text-white hover:bg-green-700"
                                    onClick={() => fetchKnowledgeList()}
                                >
                                    Làm mới dữ liệu
                                </Button>
                            </div>
                        </div>

                        <TableCourse
                            knowledgeId={selectedKienThucId}
                            onRowClick={handleRowClick}
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
} 