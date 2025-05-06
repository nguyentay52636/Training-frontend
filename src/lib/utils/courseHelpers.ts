/**
 * Helper function to convert loại học phần value to display string
 * 0 = "Tự chọn" (Optional), 1 = "Bắt buộc" (Required)
 */
export const getLoaiHocPhanDisplay = (loaiHocPhan: string | number): string => {
    if (loaiHocPhan === 0 || loaiHocPhan === "0") {
        return "Tự chọn";
    } else if (loaiHocPhan === 1 || loaiHocPhan === "1") {
        return "Bắt buộc";
    } else {
        return String(loaiHocPhan);
    }
};

/**
 * Helper function to get appropriate badge color based on loại học phần
 * Returns Tailwind CSS classes
 */
export const getLoaiHocPhanBadgeColor = (loaiHocPhan: string | number): string => {
    if (loaiHocPhan === 0 || loaiHocPhan === "0") {
        return "bg-orange-100 text-orange-700"; // Orange for optional
    } else if (loaiHocPhan === 1 || loaiHocPhan === "1") {
        return "bg-green-100 text-green-700"; // Green for required
    } else {
        return "bg-gray-100 text-gray-700"; // Default gray
    }
};

/**
 * Loại học phần options with display and value mapping
 * For use in select dropdowns
 */
export const loaiHocPhanOptions = [
    { display: "Tự chọn", value: "0" },
    { display: "Bắt buộc", value: "1" }
];

/**
 * Convert display string back to value
 * "Tự chọn" = 0, "Bắt buộc" = 1
 */
export const getLoaiHocPhanValue = (displayString: string): string => {
    if (displayString === "Tự chọn") {
        return "0";
    } else if (displayString === "Bắt buộc") {
        return "1";
    } else {
        return displayString;
    }
}; 