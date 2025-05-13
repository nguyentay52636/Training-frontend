"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getAllPoint } from "@/lib/apis/pointApi"
import { PointType } from "@/lib/apis/types"

// Hàm tính toán thống kê điểm
const calculatePointStatistics = (points: PointType[]) => {
  const statistics = {
    excellent: 0, // 9-10
    good: 0,      // 7-8.9
    average: 0,   // 5-6.9
    poor: 0,      // 3-4.9
    fail: 0       // 0-2.9
  };

  points.forEach(point => {
    // Calculate average score from all components
    const averageScore = (point.diemChuyenCan + point.diemThucHanh + point.diemGiuaKy + point.diemCuoiKy) / 4;
    
    if (averageScore >= 9) statistics.excellent++;
    else if (averageScore >= 7) statistics.good++;
    else if (averageScore >= 5) statistics.average++;
    else if (averageScore >= 3) statistics.poor++;
    else statistics.fail++;
  });

  return statistics;
};

const chartConfig = {
  excellent: {
    label: "Xuất sắc",
    color: "hsl(var(--chart-1))",
  },
  good: {
    label: "Giỏi",
    color: "hsl(var(--chart-2))",
  },
  average: {
    label: "Trung bình",
    color: "hsl(var(--chart-3))",
  },
  poor: {
    label: "Yếu",
    color: "hsl(var(--chart-4))",
  },
  fail: {
    label: "Kém",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function PointStatistics() {
  const [points, setPoints] = useState<PointType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await getAllPoint();
        if (data) {
          setPoints(data);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  const statistics = calculatePointStatistics(points);
  const chartData = [
    {
      category: "Xuất sắc",
      count: statistics.excellent,
      color: "var(--color-excellent)"
    },
    {
      category: "Giỏi",
      count: statistics.good,
      color: "var(--color-good)"
    },
    {
      category: "Trung bình",
      count: statistics.average,
      color: "var(--color-average)"
    },
    {
      category: "Yếu",
      count: statistics.poor,
      color: "var(--color-poor)"
    },
    {
      category: "Kém",
      count: statistics.fail,
      color: "var(--color-fail)"
    }
  ];

  const totalStudents = points.length;
  const passRate = ((statistics.excellent + statistics.good + statistics.average) / totalStudents * 100).toFixed(1);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thống kê điểm</CardTitle>
          <CardDescription>Đang tải dữ liệu...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thống kê điểm học sinh</CardTitle>
        <CardDescription>Phân bố điểm theo các mức độ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
            
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                label={{ value: 'Số lượng học sinh', angle: -90, position: 'insideLeft' }}
              />
              <Bar
                dataKey="count"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tỷ lệ đạt: {passRate}% <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tổng số học sinh: {totalStudents}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" />
            <span>Xuất sắc: {statistics.excellent}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span>Giỏi: {statistics.good}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]" />
            <span>Trung bình: {statistics.average}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))]" />
            <span>Yếu: {statistics.poor}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-5))]" />
            <span>Kém: {statistics.fail}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 