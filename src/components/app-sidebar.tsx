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
      url: "#",
      icon: User,
      items: [
        {
          title: "Danh sách giảng viên",
          url: "#",
        },
        {
          title: "Thêm giảng viên",
          url: "#",
        },
        {
          title: "Hồ sơ giảng viên",
          url: "#",
        },
      ],
    },
    {
      title: "Quản lý điểm",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Nhập điểm",
          url: "#",
        },
        {
          title: "Xem điểm",
          url: "#",
        },
        {
          title: "Thống kê điểm",
          url: "#",
        },
      ],
    },
    {
      title: "Thống kê",
      url: "#",
      icon: BarChart,
      items: [
        {
          title: "Thống kê sinh viên",
          url: "#",
        },
        {
          title: "Thống kê giảng viên",
          url: "#",
        },
        {
          title: "Thống kê học tập",
          url: "#",
        },
      ],
    },
    {
      title: "Tài liệu",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Hướng dẫn sử dụng",
          url: "#",
        },
        {
          title: "Tài liệu tham khảo",
          url: "#",
        },
        {
          title: "Câu hỏi thường gặp",
          url: "#",
        },
      ],
    },
    {
      title: "Cài đặt",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Tài khoản",
          url: "#",
        },
        {
          title: "Hệ thống",
          url: "#",
        },
        {
          title: "Thông báo",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Trang chủ",
      url: "#",
      icon: Home,
    },
    {
      name: "Quản lý điểm",
      url: "#",
      icon: FileText,
    },
    {
      name: "Quản lý giảng viên",
      url: "#",
      icon: User,
    },
    {
      name: "Quản lý tài khoản",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className=" fixed font-bold  border-r shadow-md z-1"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className=" text-black py-3">
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