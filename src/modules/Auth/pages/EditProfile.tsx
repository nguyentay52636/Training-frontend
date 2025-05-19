import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { LectureType } from "@/lib/apis/types";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { getLectureByIdAPI, updateLectureAPI } from "@/lib/apis/lectureApi";
import { toast } from "react-toastify";
import { updateUser } from "@/redux/slices/authSlice";

export const LecturerEditProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.auth);

    // State for lecturer data
    const [lecturer, setLecturer] = useState<LectureType>({
        maGiangVien: auth.user?.userName || "",
        tenGiangVien: auth.user?.userName || "",
        chucDanh: "",
        namPhong: "",
        trinhDo: "",
        nuoc: "",
        namTotNghiep: ""
    });

    // State for avatar
    const [avatar, setAvatar] = useState<string>("https://github.com/shadcn.png");

    useEffect(() => {
        const fetchLecturerData = async () => {
            try {
                if (auth.user?.id) {
                    const data = await getLectureByIdAPI(auth.user.id);
                    setLecturer(data);
                    // Nếu có avatar từ API thì sử dụng, nếu không thì giữ nguyên avatar mặc định
                    if (data.avatar) {
                        setAvatar(data.avatar);
                    }
                }
            } catch (error) {
                toast.error("Không thể tải thông tin giảng viên");
            }
        };
        fetchLecturerData();
    }, [auth.user?.id]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLecturer((prev) => ({ ...prev, [name]: value }));
    };

    // Handle avatar upload
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            // TODO: Implement avatar upload to server
            toast.info("Tính năng upload avatar đang được phát triển");
        }
    };

    // Handle save profile
    const handleSaveProfile = async () => {
        try {
            if (auth.user?.id) {
                const updatedData = await updateLectureAPI(auth.user.id, lecturer);
                // Update Redux state with new data
                dispatch(updateUser({
                    ...auth.user,
                    userName: lecturer.tenGiangVien
                }));
                toast.success("Cập nhật thông tin thành công");
            }
        } catch (error) {
            toast.error("Không thể cập nhật thông tin");
        }
    };

    // Split tenGiangVien into first and last names for display
    const nameParts = lecturer.tenGiangVien.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    return (
        <div className="container mx-auto py-8 max-w-md">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-lg font-semibold text-gray-500">Hồ sơ của tôi</h1>
                <span className="text-gray-400"></span>
                <h1 className="text-lg font-semibold text-gray-700">Chỉnh sửa hồ sơ</h1>
            </div>

            {/* Avatar Section */}
            <div className="relative flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={avatar} alt={lecturer.tenGiangVien} />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
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
                            Tên
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) =>
                                setLecturer((prev) => ({
                                    ...prev,
                                    tenGiangVien: `${e.target.value} ${lastName}`,
                                }))
                            }
                            className="mt-1 h-10"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-600">
                            Họ
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) =>
                                setLecturer((prev) => ({
                                    ...prev,
                                    tenGiangVien: `${firstName} ${e.target.value}`,
                                }))
                            }
                            className="mt-1 h-10"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-600">
                        Mật khẩu
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
                            ĐỔI MẬT KHẨU
                        </Button>
                    </div>
                </div>

                {/* Mã Giảng Viên */}
                <div>
                    <Label htmlFor="maGiangVien" className="text-sm font-medium text-gray-600">
                        Mã giảng viên
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
                        Chức danh
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
                        Trình độ
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
                        Năm phong
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
                        Quốc gia
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
                        Năm tốt nghiệp
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
                <Button
                    onClick={handleSaveProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
};