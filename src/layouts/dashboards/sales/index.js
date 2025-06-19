import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Eye, MousePointer } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
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

const pieData = [
  { name: "Tốc độ vượt quy định", value: 44.4, color: "#3b82f6" },
  { name: "Vượt đèn đỏ", value: 22.2, color: "#ef4444" },
  { name: "Đi sai làn đường", value: 16.7, color: "#22c55e" },
  { name: "Dừng/đỗ sai quy định", value: 11.1, color: "#8b5cf6" },
  { name: "Khác", value: 5.0, color: "#a855f7" },
];

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

const ageData = [
  { age: "0h-6h", value: 5.3 },
  { age: "6h-9h", value: 28.7 },
  { age: "9h-12h", value: 17.2 },
  { age: "12h-15h", value: 12.4 },
  { age: "15h-18h", value: 22.1 },
  { age: "18h-21h", value: 11.9 },
  { age: "21h-24h", value: 2.4 },
];

const countryData = [
  { country: "Hoàn Kiếm", flag: " ", value: 5200, percentage: 89.2 },
  { country: "Đống Đa", flag: " ", value: 4800, percentage: 86.5 },
  { country: "Hai Bà Trưng", flag: " ", value: 3900, percentage: 84.1 },
  { country: "Cầu Giấy", flag: " ", value: 3200, percentage: 82.4 },
  { country: "Thanh Xuân", flag: " ", value: 2900, percentage: 78.2 },
  { country: "Ba Đình", flag: " ", value: 2100, percentage: 90.6 },
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
        breadcrumbRoute={["Dashboard", "Tổng quan giao thông"]}
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
      <div className="grid grid-cols-3 md:grid-cols-1 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng lượt phương tiện hôm nay
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,200,000</div>
            <p className="text-xs text-green-600">+5.5% so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Số vi phạm AI phát hiện
            </CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32,000</div>
            <p className="text-xs text-green-600">+12% so với hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tỷ lệ xử lý vi phạm (%)
            </CardTitle>
            <MousePointer className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.7%</div>
            <p className="text-xs text-green-600">+3.2% so với tuần trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-8">
        {/* Channels Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Tỷ lệ loại vi phạm giao thông
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const { name, value } = payload[0].payload;
                          return (
                            <div className="bg-white border border-gray-300 shadow px-3 py-2 rounded text-sm font-medium">
                              {`${name} : ${value.toFixed(1)}%`}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Vi phạm tốc độ chiếm tỷ lệ cao nhất, chủ yếu tại các trục giao
              thông lớn và đường vành đai.
            </p>
          </CardContent>
        </Card>

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
        {/* Sales by Age */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Tỷ lệ vi phạm theo khung giờ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ageData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 w-12">{item.age}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-800 h-2 rounded-full"
                      style={{ width: `${(item.value / 28.7) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Vi phạm theo quận huyện
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {countryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.flag}</span>
                    <span className="text-sm text-gray-700">
                      {item.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">{item.value}</span>
                    <span className="text-sm text-gray-500">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
