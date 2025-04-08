// src/components/DialogAddAccount.tsx
"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Định nghĩa type GiangVien ngay trong file
export type GiangVien = {
    maGiangVien: string;
    hoTenGV: string;
    emailGV: string;
    sdt: string;
};

interface DialogAddAccountProps {
    onAddGiangVien: (newGiangVien: GiangVien) => void;
}

export default function DialogAddAccount({ onAddGiangVien }: DialogAddAccountProps) {
    const [newGiangVien, setNewGiangVien] = useState<GiangVien>({
        maGiangVien: "",
        hoTenGV: "",
        emailGV: "",
        sdt: "",
    });

    const handleAddGiangVien = () => {
        if (
            newGiangVien.maGiangVien &&
            newGiangVien.hoTenGV &&
            newGiangVien.emailGV &&
            newGiangVien.sdt
        ) {
            onAddGiangVien(newGiangVien);
            setNewGiangVien({ maGiangVien: "", hoTenGV: "", emailGV: "", sdt: "" });
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md">
                    <Plus className="mr-2 h-5 w-5" /> Thêm Giảng Viên
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-blue-900 text-xl">Thêm Giảng Viên Mới</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Vui lòng nhập đầy đủ thông tin giảng viên để thêm vào hệ thống.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="maGiangVien" className="text-right font-medium text-gray-700">
                            Mã Giảng Viên
                        </Label>
                        <Input
                            id="maGiangVien"
                            value={newGiangVien.maGiangVien}
                            onChange={(e) =>
                                setNewGiangVien({ ...newGiangVien, maGiangVien: e.target.value })
                            }
                            className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                            placeholder="VD: GV004"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hoTenGV" className="text-right font-medium text-gray-700">
                            Họ Tên
                        </Label>
                        <Input
                            id="hoTenGV"
                            value={newGiangVien.hoTenGV}
                            onChange={(e) =>
                                setNewGiangVien({ ...newGiangVien, hoTenGV: e.target.value })
                            }
                            className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                            placeholder="VD: Nguyễn Văn D"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="emailGV" className="text-right font-medium text-gray-700">
                            Email
                        </Label>
                        <Input
                            id="emailGV"
                            value={newGiangVien.emailGV}
                            onChange={(e) =>
                                setNewGiangVien({ ...newGiangVien, emailGV: e.target.value })
                            }
                            className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                            placeholder="VD: email@sgu.edu.vn"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sdt" className="text-right font-medium text-gray-700">
                            Số Điện Thoại
                        </Label>
                        <Input
                            id="sdt"
                            value={newGiangVien.sdt}
                            onChange={(e) =>
                                setNewGiangVien({ ...newGiangVien, sdt: e.target.value })
                            }
                            className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                            placeholder="VD: 0931234567"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleAddGiangVien}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg"
                    >
                        Thêm Giảng Viên
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}