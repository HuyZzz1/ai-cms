import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, Car, AlertTriangle, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./components/FilterDropdown";

const vehicleTrafficData = [
  { day: "Thứ 2", vehicles: 28500 },
  { day: "Thứ 3", vehicles: 32000 },
  { day: "Thứ 4", vehicles: 29800 },
  { day: "Thứ 5", vehicles: 31500 },
  { day: "Thứ 6", vehicles: 35200 },
  { day: "Thứ 7", vehicles: 22800 },
  { day: "Chủ nhật", vehicles: 18500 },
];

const violationsData = [
  { month: "T4", violations: 420 },
  { month: "T5", violations: 380 },
  { month: "T6", violations: 450 },
  { month: "T7", violations: 490 },
  { month: "T8", violations: 520 },
  { month: "T9", violations: 480 },
  { month: "T10", violations: 510 },
  { month: "T11", violations: 530 },
  { month: "T12", violations: 530 },
];

const cameraPerformanceData = [
  { month: "T4", cameras: 145 },
  { month: "T5", cameras: 148 },
  { month: "T6", cameras: 152 },
  { month: "T7", cameras: 155 },
  { month: "T8", cameras: 158 },
  { month: "T9", cameras: 160 },
  { month: "T10", cameras: 162 },
  { month: "T11", cameras: 165 },
  { month: "T12", cameras: 167 },
];

const districtViolations = [
  {
    district: "Hoàn Kiếm",
    violations: 1240,
    fine: "372.000.000",
    rate: "8.2%",
  },
  { district: "Đống Đa", violations: 950, fine: "290.000.000", rate: "6.7%" },
  {
    district: "Hai Bà Trưng",
    violations: 880,
    fine: "276.000.000",
    rate: "6.1%",
  },
  { district: "Cầu Giấy", violations: 600, fine: "180.000.000", rate: "4.0%" },
  { district: "Long Biên", violations: 540, fine: "162.000.000", rate: "3.6%" },
  { district: "Ba Đình", violations: 520, fine: "156.000.000", rate: "3.4%" },
];

const trafficHotspots = [
  {
    name: "Ngã tư Giải Phóng – Đại La",
    description: "Mật độ cao, thường có vi phạm vượt đèn đỏ và lấn làn.",
    violations: 89,
  },
  {
    name: "Cầu Chương Dương",
    description: "Ùn tắc giờ cao điểm. Hôm nay ghi nhận 42 lỗi.",
    violations: 42,
  },
  {
    name: "Ngã 6 Ô Chợ Dừa",
    description: "Nút giao phức tạp. Cần bổ sung cảnh báo thông minh.",
    violations: 67,
  },
];

export default function Analytics() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
  });

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
    // Ở đây bạn có thể thêm logic để lọc dữ liệu dựa trên filters
  };

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbRoute={["Bảng điều khiển", "Trang tổng quan"]}
      />

      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
          <h2 className="text-xl font-semibold text-left ">Trang tổng quan</h2>
          <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
            <FilterDropdown
              onApplyFilters={handleApplyFilters}
              initialFilters={activeFilters}
              className="sm:w-full"
            />
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6 mb-8">
          {/* Vehicle Traffic */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lưu lượng phương tiện</CardTitle>
              <CardDescription>
                Hiệu suất ghi nhận gần nhất
                <br />
                Cập nhật 2 ngày trước
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={vehicleTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 14, fontWeight: 500 }}
                  />
                  <YAxis tick={{ fontSize: 14, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ fontSize: 14 }}
                    formatter={(value) => [
                      `${value.toLocaleString()} xe`,
                      "Số lượng",
                    ]}
                  />
                  <Bar dataKey="vehicles" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Violations Today */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Số vi phạm ghi nhận hôm nay
              </CardTitle>
              <CardDescription>
                Tăng +15% so với hôm qua
                <br />
                Cập nhật 4 phút trước
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={violationsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 14, fontWeight: 500 }}
                  />
                  <YAxis tick={{ fontSize: 14, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ fontSize: 14 }}
                    formatter={(value) => [`${value} vi phạm`, "Số lượng"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="violations"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Camera Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Số camera hoạt động</CardTitle>
              <CardDescription>
                Hiệu suất toàn hệ thống
                <br />
                Vừa được cập nhật
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={cameraPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 14, fontWeight: 500 }}
                  />
                  <YAxis tick={{ fontSize: 14, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ fontSize: 14 }}
                    formatter={(value) => [`${value} camera`, "Số lượng"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="cameras"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-4 md:grid-cols-2 sm:!grid-cols-1 gap-6 mb-8">
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">13,492</p>
                  <p className="text-sm text-gray-300">
                    +18% so với tuần trước
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Sự kiện đã ghi nhận
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">24,500</p>
                  <p className="text-sm text-gray-300">+3% so với hôm qua</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Phương tiện hôm nay
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded">
                  <Car className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">530</p>
                  <p className="text-sm text-gray-300">
                    +11% tăng so với hôm qua
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Vi phạm hôm nay</p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-gray-300">
                    Cập nhật cách đây 2 phút
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Camera gặp sự cố</p>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded">
                  <Camera className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Hotspots */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Các điểm nóng giao thông</h2>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
            {trafficHotspots.map((hotspot, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg"
                    alt={hotspot.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {hotspot.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {hotspot.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Vi phạm hôm nay: {hotspot.violations}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        Điểm nóng
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* District Violations and Map */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê vi phạm theo quận</CardTitle>
              <CardDescription>
                Dữ liệu vi phạm và mức phạt ước tính
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                  <span>Quận/Huyện</span>
                  <span>Vi phạm</span>
                  <span>Mức phạt (VNĐ)</span>
                  <span className="text-center">Tỷ lệ (%)</span>
                </div>
                {districtViolations.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-gray-100"
                  >
                    <span className="font-medium">{item.district}</span>
                    <span className="text-red-600 font-medium">
                      {item.violations.toLocaleString()}
                    </span>
                    <span className="text-gray-600">{item.fine}</span>
                    <span className="text-blue-600 font-medium text-center">
                      {item.rate}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bản đồ mật độ giao thông TP Hà Nội</CardTitle>
              <CardDescription>
                Các điểm vi phạm hiển thị bằng chấm đỏ, quy mô theo số lỗi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Bản đồ Hà Nội"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded"
                />
                {/* Large violation spots */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg opacity-80"></div>
                <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg opacity-90"></div>
                <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-red-400 rounded-full border-2 border-white shadow-lg opacity-70"></div>
                <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg opacity-85"></div>
                <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-red-400 rounded-full border-2 border-white shadow-lg opacity-75"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm md:flex-col md:items-start">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white"></div>
                  <span>Cao ({">"} 100 vi phạm)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                  <span>Trung bình (50-100)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
                  <span>Thấp ({"<"} 50)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
