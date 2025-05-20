/**
 * Helper function to convert loại học phần value to display string
 * 0 = "Bắt buộc" (Required), 1 = "Tự chọn" (Optional), 2 = "Thực tập" (Internship)
 */
export const getLoaiHocPhanDisplay = (loaiHocPhan: string | number): string => {
    if (loaiHocPhan === 0 || loaiHocPhan === "0") {
        return "Bắt buộc";
    } else if (loaiHocPhan === 1 || loaiHocPhan === "1") {
        return "Tự chọn";
    } else if (loaiHocPhan === 2 || loaiHocPhan === "2") {
        return "Thực tập";
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
        return "bg-red-100 text-red-700"; // Red for required
    } else if (loaiHocPhan === 1 || loaiHocPhan === "1") {
        return "bg-green-100 text-green-700"; // Green for optional
    } else if (loaiHocPhan === 2 || loaiHocPhan === "2") {
        return "bg-blue-100 text-blue-700"; // Blue for internship
    } else {
        return "bg-gray-100 text-gray-700"; // Default gray
    }
};

/**
 * Loại học phần options with display and value mapping
 * For use in select dropdowns
 */
export const loaiHocPhanOptions = [
    { display: "Bắt buộc", value: "0" },
    { display: "Tự chọn", value: "1" },
    { display: "Thực tập", value: "2" }
];

/**
 * Convert display string back to value
 * "Bắt buộc" = 0, "Tự chọn" = 1, "Thực tập" = 2
 */
export const getLoaiHocPhanValue = (displayString: string): string => {
    if (displayString === "Bắt buộc") {
        return "0";
    } else if (displayString === "Tự chọn") {
        return "1";
    } else if (displayString === "Thực tập") {
        return "2";
    } else {
        return displayString;
    }
}; 