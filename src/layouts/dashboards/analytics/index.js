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
import { useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./components/FilterDropdown";
import TrafficHotpots from "./components/TrafficHotpots";
import ViolationsByDistrict from "./components/ViolationsByDistrict";
import MapCamera from "./components/MapCamera";

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
        <TrafficHotpots />

        {/* District Violations and Map */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
          <ViolationsByDistrict />
          <MapCamera />
        </div>
      </div>
    </DashboardLayout>
  );
}
