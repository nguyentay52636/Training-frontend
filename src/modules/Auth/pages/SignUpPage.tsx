import React from 'react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function SignUpPage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();

    return (
        <div className={cn("min-h-screen flex items-center justify-center p-4", className)} {...props}>
            <Card className="w-full max-w-4xl overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Đăng ký</h1>
                                <p className="text-muted-foreground text-balance">
                                    Tạo tài khoản mới để bắt đầu.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                                <Input id="confirm-password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Đăng ký
                            </Button>
                            <div className="text-center text-sm">
                                Đã có tài khoản?{" "}
                                <button
                                    onClick={() => navigate("/login")}
                                    className="underline underline-offset-4"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-[3rem]">Chào mừng!</h1>
                            <h6 className="text-[1.2rem]">
                                Đã có tài khoản? Nhấn đăng nhập để tiếp tục!
                            </h6>
                            <Button
                                className="mt-6"
                                onClick={() => navigate("/login")}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}