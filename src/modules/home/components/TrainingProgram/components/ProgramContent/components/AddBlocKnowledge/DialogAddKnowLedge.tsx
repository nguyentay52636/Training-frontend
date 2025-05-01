import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { getBlockKnows } from "@/lib/apis/blockKnowApi";
import { BlockKnowType } from "@/lib/apis/types";
import { X } from "lucide-react";

interface DialogAddKnowLedgeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface SelectedCourse {
    id: string;
    name: string;
    credits?: number;
}

export default function DialogAddKnowLedge({ open, onOpenChange }: DialogAddKnowLedgeProps) {
    const [blockKnows, setBlockKnows] = useState<BlockKnowType[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
    const [selectValue, setSelectValue] = useState<string>("");

    useEffect(() => {
        const fetchBlockKnows = async () => {
            try {
                setLoading(true);
                const data = await getBlockKnows();
                setBlockKnows(data);
            } catch (error) {
                console.error("Error fetching block knowledge:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlockKnows();
    }, []);

    const handleSelect = (value: string, knowledge: any) => {
        if (!selectedCourses.some(course => course.id === value)) {
            setSelectedCourses([...selectedCourses, {
                id: value,
                name: knowledge.tenKienThuc,
                credits: 3 // Mặc định là 3 tín chỉ, bạn có thể điều chỉnh theo data thực tế
            }]);
            // Reset select value
            setSelectValue("");
        }
    };

    const handleRemove = (id: string) => {
        setSelectedCourses(selectedCourses.filter(course => course.id !== id));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Thêm học phần</DialogTitle>
                    <DialogDescription className="text-[1.2rem]">
                        Chọn học phần bạn muốn thêm vào chương trình.
                    </DialogDescription>
                </DialogHeader>

                <Select
                    value={selectValue}
                    onValueChange={(value) => {
                        setSelectValue(value);
                        const knowledge = blockKnows
                            .flatMap(block => block.danhSachKienThuc)
                            .find(k => k?.idKienThuc?.toString() === value);
                        if (knowledge) {
                            handleSelect(value, knowledge);
                        }
                    }}
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black!">
                        <SelectValue placeholder="Chọn học phần" />
                    </SelectTrigger>
                    <SelectContent>
                        {loading ? (
                            <SelectItem value="loading">Đang tải...</SelectItem>
                        ) : (
                            blockKnows.flatMap((blockKnow) =>
                                blockKnow.danhSachKienThuc?.map((knowledge) => (
                                    <SelectItem
                                        key={knowledge.idKienThuc}
                                        value={knowledge.idKienThuc ? knowledge.idKienThuc.toString() : ''}
                                    >
                                        {knowledge.tenKienThuc}
                                    </SelectItem>
                                ))
                            )
                        )}
                    </SelectContent>
                </Select>

                {selectedCourses.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Học phần đã chọn:</h3>
                        <div className="space-y-2">
                            {selectedCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                                >
                                    <span>
                                        {course.name} - {course.credits} tín chỉ
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemove(course.id)}
                                        className="hover:bg-gray-200"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
