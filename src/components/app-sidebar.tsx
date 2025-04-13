import * as React from "react";
import {
  BookOpen,
  FileText,
  BarChart,
  Settings,
  Home,
  User,
  GraduationCap,
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
      url: "/trangchu/quan-ly-giang-vien", 
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
      ],
    },
    {
      title: "Quản lý điểm",
      url: "/trangchu/quan-ly-diem",
      icon: FileText,
      items: [
        {
          title: "Thống kê điểm",
          url: "/trangchu/quan-ly-diem/thong-ke",
        },
        {
          title: "Xem diểm",
          url: "/trangchu/quan-ly-diem/xem-diem",
        },

      ],
    },
    {
      title: "Thống kê",
      url: "/trangchu/thong-ke",
      icon: BarChart,
      items: [
        {
          title: "Thống kê sinh viên",
          url: "/trangchu/thong-ke/sinh-vien",
        },
        {
          title: "Thống kê giảng viên",
          url: "/trangchu/thong-ke/giang-vien",
        },
        {
          title: "Thống kê học tập",
          url: "/trangchu/thong-ke/hoc-tap",
        },
      ],
    },
    {
      title: "Tài liệu",
      url: "/trangchu/tai-lieu",
      icon: BookOpen,
      items: [
        {
          title: "Hướng dẫn sử dụng",
          url: "/trangchu/tai-lieu/huong-dan",
        },
        {
          title: "Tài liệu tham khảo",
          url: "/trangchu/tai-lieu/tham-khao",
        },
        {
          title: "Câu hỏi thường gặp",
          url: "/trangchu/tai-lieu/cau-hoi",
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
        {
          title: "Thông báo",
          url: "/trangchu/cai-dat/thong-bao",
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
      name: "Quản lý điểm",
      url: "/trangchu/quan-ly-diem",
      icon: FileText,
    },
    {
      name: "Quản lý giảng viên",
      url: "/trangchu/quan-ly-giang-vien",
      icon: User,
    },
    {
      name: "Quản lý tài khoản",
      url: "/trangchu/quan-ly-tai-khoan", // Cập nhật để khớp với navMain
      icon: Settings,
    },
    {
      name: "Lịch giảng dạy",
      url: "/trangchu/lich-giang-day",
      icon: FileText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="fixed font-semibold border-r shadow-md z-50"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="text-black py-8">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}