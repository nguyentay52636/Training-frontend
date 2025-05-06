'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseKnowledgeManager from "./CourseKnowledgeManager";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseDetailsMain() {
    const [activeTab, setActiveTab] = useState("knowledge-management");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Quản lý học phần và kiến thức</h1>

            <Tabs
                defaultValue="knowledge-management"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="knowledge-management" className="text-lg py-3">
                        Học phần theo kiến thức
                    </TabsTrigger>
                    <TabsTrigger value="all-courses" className="text-lg py-3">
                        Tất cả học phần
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="knowledge-management" className="mt-6">
                    <CourseKnowledgeManager />
                </TabsContent>

                <TabsContent value="all-courses" className="mt-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">Phần này sẽ hiển thị tất cả học phần trong hệ thống</p>
                                <p className="text-sm mt-2">Đang được phát triển...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 