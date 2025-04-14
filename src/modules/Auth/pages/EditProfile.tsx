import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface Lecturer {
    maGiangVien: string;
    hoTenGV: string;
    chucDanh: string;
    namPhong: string;
    trinhDo: string;
    nuoc: string;
    namTotNghiep: string;
}

const lecturerData: Lecturer = {
    maGiangVien: "TienHoang004",
    hoTenGV: "Đặng Tiến Hoàn",
    chucDanh: "Virus",
    namPhong: "2025",
    trinhDo: "Đạo diễn",
    nuoc: "Việt nam",
    namTotNghiep: "2024",
};

export const LecturerEditProfile: React.FC = () => {
    // State for lecturer data
    const [lecturer, setLecturer] = useState<Lecturer>(lecturerData);

    // State for avatar (using maGiangVien as a seed for the placeholder image)
    const [avatar, setAvatar] = useState<string>(
        `https://i.pravatar.cc/150?u=${lecturerData.maGiangVien}`
    );

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLecturer((prev) => ({ ...prev, [name]: value }));
    };

    // Handle avatar upload (placeholder functionality)
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    // Split hoTenGV into first and last names for display (simplified approach)
    const nameParts = lecturer.hoTenGV.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    return (
        <div className="container mx-auto py-8 max-w-md">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-lg font-semibold text-gray-500">My profile</h1>
                <span className="text-gray-400"></span>
                <h1 className="text-lg font-semibold text-gray-700">Edit Profile</h1>
            </div>

            {/* Avatar Section */}
            <div className="relative flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={avatar} alt={lecturer.hoTenGV} />
                    <AvatarFallback>
                        {firstName[0]}
                        {lastName[0] || firstName[1]}
                    </AvatarFallback>
                </Avatar>
                <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-1/2 transform translate-x-6 bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
                >
                    <Camera className="h-5 w-5 text-gray-600" />
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </label>
            </div>

            {/* Form Section */}
            <div className="space-y-4">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-600">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) =>
                                setLecturer((prev) => ({
                                    ...prev,
                                    hoTenGV: `${e.target.value} ${lastName}`,
                                }))
                            }
                            className="mt-1 h-10"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-600">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) =>
                                setLecturer((prev) => ({
                                    ...prev,
                                    hoTenGV: `${firstName} ${e.target.value}`,
                                }))
                            }
                            className="mt-1 h-10"
                        />
                    </div>
                </div>

                {/* Password (unchanged from previous UI) */}
                <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                        Password
                    </Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="password"
                            type="password"
                            value="********"
                            disabled
                            className="mt-1 h-10 flex-1"
                        />
                        <Button
                            variant="link"
                            className="text-green-500 hover:text-green-600 text-sm font-medium"
                        >
                            CHANGE PASSWORD
                        </Button>
                    </div>
                </div>

                {/* Mã Giảng Viên */}
                <div>
                    <Label htmlFor="maGiangVien" className="text-sm font-medium text-gray-600">
                        Lecturer ID
                    </Label>
                    <Input
                        id="maGiangVien"
                        name="maGiangVien"
                        value={lecturer.maGiangVien}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>

                {/* Chức Danh */}
                <div>
                    <Label htmlFor="chucDanh" className="text-sm font-medium text-gray-600">
                        Title
                    </Label>
                    <Input
                        id="chucDanh"
                        name="chucDanh"
                        value={lecturer.chucDanh}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>

                {/* Trình Độ */}
                <div>
                    <Label htmlFor="trinhDo" className="text-sm font-medium text-gray-600">
                        Degree
                    </Label>
                    <Input
                        id="trinhDo"
                        name="trinhDo"
                        value={lecturer.trinhDo}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>

                {/* Năm Phong */}
                <div>
                    <Label htmlFor="namPhong" className="text-sm font-medium text-gray-600">
                        Year of Appointment
                    </Label>
                    <Input
                        id="namPhong"
                        name="namPhong"
                        value={lecturer.namPhong}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>

                {/* Nước */}
                <div>
                    <Label htmlFor="nuoc" className="text-sm font-medium text-gray-600">
                        Nation
                    </Label>
                    <Input
                        id="nuoc"
                        name="nuoc"
                        value={lecturer.nuoc}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>

                {/* Năm Tốt Nghiệp */}
                <div>
                    <Label htmlFor="namTotNghiep" className="text-sm font-medium text-gray-600">
                        Graduation Year
                    </Label>
                    <Input
                        id="namTotNghiep"
                        name="namTotNghiep"
                        value={lecturer.namTotNghiep}
                        onChange={handleInputChange}
                        className="mt-1 h-10"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                    Save
                </Button>
            </div>
        </div>
    );
};