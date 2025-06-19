import { useState } from "react";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import TrafficViolationsTable from "./TrafficViolationsTable";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function History() {
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
    dateRange: {},
    type: "all",
    status: "all",
  });

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
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
          <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-1 sm:w-full">
            <Download className="h-4 w-4" />
            <span>Xuất dữ liệu</span>
          </Button>
        </div>
      </div>

      <TrafficViolationsTable />
    </DashboardLayout>
  );
}
