import { useMemo, useRef, useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import TrafficViolationsTable from "./TrafficViolationsTable";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/service/constant";
import { getListCameraQuery } from "@/service/api/camera";
import dayjs from "dayjs";
import CreateCameraForm from "@/layouts/camera/manager/modal/CreateCameraForm";
import * as XLSX from "xlsx";

export default function HistoryCamera() {
  const modalRef = useRef();

  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtId: "all",
    status: "all",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1); // reset page when filters change
  };

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.cameras, activeFilters, currentPage],
    queryFn: () => {
      const filter = {};
      if (activeFilters.districtId !== "all") {
        filter.districtId = activeFilters.districtId;
      }
      if (activeFilters.status !== "all") {
        filter.status = activeFilters.status;
      }

      const queryParams = {
        page: currentPage,
        limit: itemsPerPage,
        searchType: "device",
        ...(activeFilters.searchQuery && { search: activeFilters.searchQuery }),
        ...(Object.keys(filter).length > 0 && { filter }),
      };

      return getListCameraQuery(queryParams);
    },
  });

  const getStatusText = (status) => {
    const statusTextMap = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      error: "Lỗi",
    };

    return statusTextMap[status] || status;
  };

  const formattedData = useMemo(() => {
    return (
      data?.docs?.map((item, index) => ({
        stt: (currentPage - 1) * 10 + index + 1,
        deviceId: item.device,
        location: item.location,
        area: item.districtId?.name || "-",
        coordinates: `${item.lat}, ${item.lng}`,
        status: item.status,
        lastUpdate: dayjs(item.updatedAt || item.createdAt).format(
          "DD/MM/YYYY HH:mm"
        ),
        aiDetection: item.isAI ? "Có" : "Không",
      })) || []
    );
  }, [data]);

  const handleExportExcel = () => {
    if (!formattedData || formattedData.length === 0) return;

    const exportData = formattedData.map((item) => ({
      "Mã thiết bị": item.deviceId,
      "Vị trí lắp đặt": item.location,
      "Khu vực": item.area,
      "Tọa độ": item.coordinates,
      "Trạng thái": getStatusText(item.status),
      "Lần cập nhật cuối": item.lastUpdate,
      AI: item.isAI ? "Có" : "Không",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachCamera");

    XLSX.writeFile(workbook, "danh_sach_camera.xlsx");
  };

  return (
    <>
      <CreateCameraForm ref={modalRef} />

      <DashboardLayout>
        <DashboardNavbar
          breadcrumbRoute={["Quản lí dữ liệu", "Quản lí thiết bị camera"]}
        />
        <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
          <h2 className="text-xl font-semibold text-left flex-1">
            Quản lí thiết bị camera
          </h2>
          <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
            <FilterDropdown
              onApplyFilters={handleApplyFilters}
              initialFilters={activeFilters}
              className="sm:w-full"
            />

            <Button
              className="flex items-center gap-2 sm:w-full"
              onClick={() => modalRef.current?.open()}
            >
              <Plus className="w-4 h-4" />
              Thêm thiết bị
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 sm:w-full"
              onClick={handleExportExcel}
            >
              <Download className="w-4 h-4" />
              Xuất dữ liệu
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
    </>
  );
}
