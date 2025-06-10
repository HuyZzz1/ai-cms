import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CameraCard from "./CameraCard";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";

export default function CameraManagement() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtFilter: "all",
    status: "all",
  });

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
  };

  const cameras = [
    {
      id: "CAM_0975",
      status: "Tốt",
      location: "Ngã tư Giải Phóng – Đại La",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:40:00Z",
    },
    {
      id: "CAM_0976",
      status: "Tốt",
      location: "Cổng công viên Thống Nhất",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:38:20Z",
    },
    {
      id: "CAM_0979",
      status: "Cảnh báo AI",
      location: "Ngã tư Láng – Nguyễn Chí Thanh",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:38:12Z",
    },
    {
      id: "CAM_0980",
      status: "Đang kiểm tra",
      location: "Cầu Chương Dương",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:35:15Z",
    },
    {
      id: "CAM_0981",
      status: "Tốt",
      location: "Phố Hàng Bài – Hoàn Kiếm",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:42:30Z",
    },
    {
      id: "CAM_0982",
      status: "Mất tín hiệu",
      location: "Ngã tư Đội Cấn – Ba Đình",
      image: "/placeholder.svg?height=300&width=500&text=No+Signal",
      last_updated: "2025-06-03T09:20:45Z",
    },
    {
      id: "CAM_0983",
      status: "Tốt",
      location: "Cầu vượt Thái Hà",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:41:12Z",
    },
    {
      id: "CAM_0984",
      status: "Tốt",
      location: "Ngã tư Cầu Giấy",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:39:28Z",
    },
    {
      id: "CAM_0985",
      status: "Cảnh báo AI",
      location: "Phố cổ Hà Nội",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:37:55Z",
    },
    {
      id: "CAM_0986",
      status: "Tốt",
      location: "Cầu Long Biên",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:43:10Z",
    },
    {
      id: "CAM_0987",
      status: "Đang kiểm tra",
      location: "Ngã tư Nguyễn Trãi – Khuất Duy Tiến",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:25:33Z",
    },
    {
      id: "CAM_0988",
      status: "Tốt",
      location: "Cầu vượt Hoàng Minh Giám",
      image: "/placeholder.svg?height=300&width=500&text=Live+Stream",
      last_updated: "2025-06-03T09:44:02Z",
    },
  ];

  // Filter cameras based on search term, area, and status
  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch = camera.id
      .toLowerCase()
      .includes(activeFilters.searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Giám sát trực tiếp"]} />
      <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
        <h2 className="text-xl font-semibold text-left flex-1">
          Giám sát trực tiếp
        </h2>
        <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
          <FilterDropdown
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            className="sm:w-full"
          />
          <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-1 sm:w-full">
            <Plus className="h-4 w-4" />
            <span>Thêm Camera Mới</span>
          </Button>
        </div>
      </div>

      <main>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Hiển thị {filteredCameras.length} / {cameras.length} camera
          </p>
        </div>

        {/* Camera grid */}
        <div className="grid grid-cols-1 sm-min:grid-cols-2 lg-min:grid-cols-3 xl-min:grid-cols-4 gap-3 sm-min:gap-4">
          {filteredCameras.map((camera) => (
            <CameraCard key={camera.id} camera={camera} />
          ))}
        </div>

        {/* No results */}
        {filteredCameras.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Không tìm thấy camera nào phù hợp với bộ lọc
            </p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
