import { useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import TrafficViolationsTable from "./TrafficViolationsTable";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryCamera() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
    dateRange: {},
    type: "all",
    status: "all",
    districtFilter: "all",
  });

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  return (
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

          <Button className="flex items-center gap-2 sm:w-full">
            <Plus className="w-4 h-4" />
            Thêm thiết bị
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 sm:w-full"
          >
            <Download className="w-4 h-4" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      <TrafficViolationsTable />
    </DashboardLayout>
  );
}
