import { Button } from "@/components/ui/button";
import React from "react";

export default function PaginationPoint() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center py-4 px-4 bg-gray-50 rounded-lg shadow-sm mt-6">
            {/* Phần phân trang rỗng */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all duration-200 flex items-center justify-center px-4 py-2"
                    disabled
                >
                    Trang trước
                </Button>

                <span className="text-sm font-medium text-gray-700">
                    1-10 của 0
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all duration-200 flex items-center justify-center px-4 py-2"
                    disabled
                >
                    Trang sau
                </Button>
            </div>
        </div>
    );
}