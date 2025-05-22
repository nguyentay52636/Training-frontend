import * as React from "react";
import {
  BookOpen,
  FileText,
  BarChart,
  Settings,
  Home,
  User,
  GraduationCap,
  Book,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";

const data = {
  user: {
    name: "Admin SGU",
    email: "admin@sgu.edu.vn",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Đại học Sài Gòn",
      logo: GraduationCap,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Quản lý giảng viên",
      url: "/trangchu/quan-ly-giang-vien/danh-sach-giang-vien",
      icon: User,
      items: [
        {
          title: "Danh sách giảng viên",
          url: "/trangchu/quan-ly-giang-vien/danh-sach-giang-vien",
        },
        {
          title: "Phân công giảng dạy",
          url: "/trangchu/quan-ly-giang-vien/lich-giang-day",
        },
        {
          title: "Kế hoạch mở nhóm",
          url: "/trangchu/quan-ly-giang-vien/ke-hoach-mo-nhom",
        },
      ],
    },
    {
      title: "Kiến thức và học phần ",
      url: "/trangchu/quan-ly-khoi/khoikienthuc",
      icon: Book,
      items: [
        {
          title: " Quản lý  khối kiến thức",
          url: "/trangchu/quan-ly-khoi/khoikienthuc",
        },
        {
          title: "  Quản lý  kiến thức",
          url: "/trangchu/quan-ly-khoi/kienthuc",
        },
        {
          title: " Quản lý học phần  ",
          url: "/trangchu/quan-ly-khoi/hocphan",
        },
      ],
    },
    {
      title: "Quản lý điểm",
      url: "/trangchu/quan-ly-diem",
      icon: FileText,
      items: [

        {
          title: "Xem diểm",
          url: "/trangchu/quan-ly-diem/xem-diem",
        },
        {
          title: "Thống kê điểm",
          url: "/trangchu/quan-ly-diem/thong-ke-diem",
        },
      ],
    },

    {
      title: "Tài liệu",
      url: "/trangchu/tai-lieu",
      icon: BookOpen,
      items: [
        {
          title: "Đề cương chi tiết",
          url: "/trangchu/tai-lieu/de-cuong-chi-tiet",
        },
        {
          title: "Thông tin chung",
          url: "/trangchu/tai-lieu/thong-tin-chung",
        },

      ],
    },


    {
      title: "Cài đặt",
      url: "/trangchu/cai-dat",
      icon: Settings,
      items: [
        {
          title: "Tài khoản",
          url: "/trangchu/cai-dat/tai-khoan",
        },
        {
          title: "Hệ thống",
          url: "/trangchu/cai-dat/he-thong",
        },

      ],
    },
  ],
  projects: [
    {
      name: "Trang chủ",
      url: "/trangchu",
      icon: Home,
    },

    {
      name: "Quản lý giảng viên",
      url: "/trangchu/quan-ly-giang-vien/danh-sach-giang-vien",
      icon: User,
    },
    {
      name: "Quản lý tài khoản",
      url: "/trangchu/quan-ly-tai-khoan",
      icon: Settings,
    },
    // {
    //   name: "Lịch giảng dạy",
    //   url: "/trangchu/lich-giang-day",
    //   icon: FileText,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = useAppSelector((state: RootState) => state.auth);
  return (
    <Sidebar
      className="fixed font-semibold border-r shadow-md z-50 h-screen overflow-y-auto"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="text-black py-8 sticky top-0 bg-white z-10">
        <TeamSwitcher teams={data.teams} />
        <>
          <div className="flex flex-col items-center mt-10">
            <Avatar className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md overflow-hidden">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={auth.user?.userName || "User"}
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600 w-full h-full flex items-center justify-center text-xl">
                {auth.user?.userName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">Xin chào,</p>
              <p className="text-base font-semibold text-gray-800">{auth.user?.userName || "User"}</p>
            </div>
          </div>
        </>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="sticky bottom-0 bg-white z-10">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}