import { useMemo, useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import TrafficViolationsTable from "./TrafficViolationsTable";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getListViolationsQuery } from "@/service/api/violations";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/service/constant";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

export default function History() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    status: "all",
    ruleId: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.violations, activeFilters, currentPage],
    queryFn: () => {
      const filter = {};
      if (activeFilters.ruleId !== "all") {
        filter.ruleId = activeFilters.ruleId;
      }
      if (activeFilters.status !== "all") {
        filter.status = activeFilters.status;
      }

      const queryParams = {
        page: currentPage,
        limit: 12,
        searchType: "vehiclePlate",
        ...(activeFilters.searchQuery && { search: activeFilters.searchQuery }),
        ...(Object.keys(filter).length > 0 && { filter }),
      };

      return getListViolationsQuery(queryParams);
    },
    keepPreviousData: true,
  });

  const formattedData = useMemo(() => {
    return data?.docs?.map((item, index) => ({
      stt: (currentPage - 1) * 10 + index + 1,
      time: dayjs(item.createdAt).format("HH:mm"),
      date: dayjs(item.createdAt).format("DD/MM/YYYY"),
      violation: item.ruleId?.name || item.name || "Không rõ",
      location: item.cameraId?.location || "Không rõ",
      status: item.status,
      camera: item.cameraId?.device || "-",
      evidence: "Hình ảnh",
      vehicleType: item.vehicleType,
      color: item.vehicleColor || "-",
      licensePlate: item.vehiclePlate || "-",
      evidences: item?.evidences,
    }));
  }, [data]);

  const convertStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lí";
      case "processing":
        return "Đang xử lí";
      case "resolved":
        return "Đã ghi nhận";
      case "ignored":
        return "Bỏ qua";
      case "sent_warning":
        return "Cảnh báo gửi đi";

      default:
        return "Không rõ";
    }
  };

  const convertVehicleType = (type) => {
    switch (type) {
      case "car":
        return "Ô tô";
      case "motorbike":
        return "Xe máy";
      case "truck":
        return "Xe tải";
      default:
        return type || "-";
    }
  };

  const handleExportExcel = () => {
    if (!formattedData || formattedData.length === 0) return;

    const exportData = formattedData.map((item) => ({
      STT: item.stt,
      "Thời gian": `${item.time} ${item.date}`,
      "Lỗi vi phạm": item.violation,
      "Vị trí phát hiện": item.location,
      "Trạng thái": convertStatus(item.status),
      Camera: item.camera,
      "Loại phương tiện": convertVehicleType(item.vehicleType),
      Màu: item.color,
      "Biển số xe": item.licensePlate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LichSuViPham");

    // Xuất file
    XLSX.writeFile(workbook, "lich_su_vi_pham.xlsx");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbRoute={["Quản lí dữ liệu", "Lịch sử & Trích xuất"]}
      />
      <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
        <h2 className="text-xl font-semibold text-left flex-1">
          Lịch sử & Trích xuất
        </h2>
        <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
          <FilterDropdown
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            className="sm:w-full"
          />
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-1 sm:w-full"
            onClick={handleExportExcel}
          >
            <Download className="h-4 w-4" />
            <span>Xuất dữ liệu</span>
          </Button>
        </div>
      </div>

      <TrafficViolationsTable
        data={formattedData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={data?.totalDocs || 0}
        isLoading={isLoading}
      />
    </DashboardLayout>
  );
}
