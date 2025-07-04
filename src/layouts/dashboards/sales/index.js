import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import TopTrafficRoutesTable from "./components/TopTrafficRoutesTable";
import { FilterDropdown } from "./components/FilterDropdown";
import { useState } from "react";
import TopMetrics from "./components/TopMetrics";
import ViolationRatePerRuleChart from "./components/ViolationRatePerRuleChart";
import ViolationByTimeFrameChart from "./components/ViolationByTimeFrameChart";
import ViolationsByDistrict from "./components/ViolationsByDistrict";

const revenueData = [
  { hour: "0h", total: 20, xeMay: 15 },
  { hour: "1h", total: 25, xeMay: 18 },
  { hour: "2h", total: 30, xeMay: 22 },
  { hour: "3h", total: 35, xeMay: 28 },
  { hour: "4h", total: 45, xeMay: 35 },
  { hour: "5h", total: 50, xeMay: 40 },
  { hour: "6h", total: 70, xeMay: 55 },
  { hour: "7h", total: 120, xeMay: 90 },
  { hour: "8h", total: 150, xeMay: 110 },
  { hour: "9h", total: 130, xeMay: 100 },
  { hour: "10h", total: 90, xeMay: 70 },
  { hour: "11h", total: 80, xeMay: 60 },
  { hour: "12h", total: 75, xeMay: 58 },
  { hour: "13h", total: 70, xeMay: 55 },
  { hour: "14h", total: 72, xeMay: 56 },
  { hour: "15h", total: 80, xeMay: 60 },
  { hour: "16h", total: 90, xeMay: 70 },
  { hour: "17h", total: 140, xeMay: 105 },
  { hour: "18h", total: 160, xeMay: 120 },
  { hour: "19h", total: 130, xeMay: 100 },
  { hour: "20h", total: 90, xeMay: 70 },
  { hour: "21h", total: 70, xeMay: 55 },
  { hour: "22h", total: 50, xeMay: 40 },
  { hour: "23h", total: 30, xeMay: 22 },
];

const topProducts = [
  {
    name: "Nguyễn Trãi",
    category: " ",
    value: "130,392 lượt",
    sales: "8,500 cảnh báo",
    percentage: "Cao",
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Trần Duy Hưng",
    category: " ",
    value: "80,250 lượt",
    sales: "4,200 cảnh báo",
    percentage: "Trung bình",
    trend: "down",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Giải Phóng",
    category: " ",
    value: "46,600 lượt",
    sales: "9,430 cảnh báo",
    percentage: "Cao",
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Vành Đai 3",
    category: " ",
    value: "91,300 lượt",
    sales: "6,350 cảnh báo",
    percentage: "Trung bình",
    trend: "down",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Phạm Văn Đồng",
    category: " ",
    value: "104,925 lượt",
    sales: "20,531 cảnh báo",
    percentage: "Rất cao",
    trend: "up",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function Sales() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
  });

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbRoute={["Bảng điều khiển", "Tổng quan giao thông"]}
      />
      <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2">
        <h2 className="text-xl font-semibold text-left ">
          Theo dõi lưu lượng, vi phạm và tình hình giao thông
        </h2>
        <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
          <FilterDropdown
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            className="sm:w-full"
          />
        </div>
      </div>

      {/* Top Metrics */}
      <TopMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-8">
        {/* Channels Pie Chart */}
        <ViolationRatePerRuleChart />

        {/* Revenue Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Biến động lưu lượng phương tiện theo giờ
            </CardTitle>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Tổng phương tiện</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-sm text-gray-600">Xe máy</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fontWeight: 500 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ fontSize: 14 }}
                    formatter={(value, name) => {
                      return [
                        `${value.toLocaleString()} phương tiện`,
                        name === "total" ? "Tổng" : "Xe máy",
                      ];
                    }}
                    labelFormatter={(label) => `Giờ: ${label}`}
                  />

                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="xeMay"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={{ fill: "#6b7280", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-8">
        <ViolationByTimeFrameChart />

        {/* Sales by Country */}
        <ViolationsByDistrict />
      </div>

      {/* Top Selling Products */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Top tuyến có mật độ phương tiện cao nhất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TopTrafficRoutesTable data={topProducts} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
