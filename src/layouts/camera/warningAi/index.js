import { useMemo, useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import TrafficViolationsTable from "./TrafficViolationsTable";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { getListViolationsQuery } from "@/service/api/violations";
import dayjs from "dayjs";

export default function WarningAi() {
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
      const filter = {
        isAI: true,
      };
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

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Cảnh báo AI"]} />
      <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
        <h2 className="text-xl font-semibold text-left flex-1">Cảnh báo AI</h2>
        <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
          <FilterDropdown
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
            className="sm:w-full"
          />
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
