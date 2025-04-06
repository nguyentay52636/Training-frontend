import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";


export default function Header() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-200 to-indigo-700 text-white py-3 px-6 flex items-center justify-between shadow-lg fixed w-full z-10">
        {/* Logo và tiêu đề */}
        <div className="flex items-center gap-3">
          <div className="w-[100px] ">
            <img src="/public/sgu-logo.jpg" alt="SGU Logo" className="object-contain rounded-full" />
          </div>
          <span className="text-xl font-semibold tracking-wide">
            Hệ Thống Quản Lý Đào Tạo SGU
          </span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#overview"
                className="text-white hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Tổng Quan
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#students"
                className="text-white hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Sinh Viên
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#courses"
                className="text-white hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Khóa Học
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#settings"
                className="text-white hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Cài Đặt
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search và User Button */}
        <div className="flex items-center gap-4">
          <form className="relative">
            <SearchIcon className="absolute left-3 top-1/5  text-gray-400" />
            <Input
              type="search"
              placeholder="Tìm kiếm sinh viên, khóa học..."
              className="bg-white text-black placeholder-gray-300 pl-10 pr-4 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
            />
          </form>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 bg-white  hover:border-blue-700 transition-colors duration-200 cursor-pointer"
          >
            <UserIcon className="h-5 w-5 text-black" />
            <span className="sr-only">Tài khoản người dùng</span>
          </Button>
        </div>
      </header>

    </div>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}