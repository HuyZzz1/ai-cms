import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ChevronDown, Search } from "lucide-react";

export function FilterDropdown({
  onApplyFilters,
  initialFilters,
  className = "",
}) {
  const defaultFilters = {
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState(initialFilters || defaultFilters);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Kiểm tra xem có phải đang click vào Select dropdown không
        const isSelectDropdown =
          event.target.closest("[data-radix-popper-content-wrapper]") ||
          event.target.closest("[data-radix-select-content]") ||
          event.target.closest("[data-radix-select-viewport]");

        if (!isSelectDropdown) {
          setShowFilterDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectClick = (e) => {
    e.stopPropagation();
  };

  const handleResetFilter = () => {
    setFilters(defaultFilters);
  };

  const handleApplyFilter = () => {
    onApplyFilters(filters);
    setShowFilterDropdown(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full"
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
      >
        <Filter className="h-4 w-4" />
        Bộ lọc nâng cao
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            showFilterDropdown ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Filter Dropdown Panel */}
      {showFilterDropdown && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Bộ lọc nâng cao
            </h3>

            <div className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  TÌM KIẾM
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm theo biển số xe, vị trí,..."
                    className="pl-10 text-sm"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleFilterChange("searchQuery", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Loại vi phạm
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger
                    className="text-sm"
                    onClick={handleSelectClick}
                  >
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="1">Vượt đèn đỏ</SelectItem>
                    <SelectItem value="2">Lấn làn</SelectItem>
                    <SelectItem value="3">Xe quay đầu cấm</SelectItem>
                    <SelectItem value="4">Đi sai chiều</SelectItem>
                    <SelectItem value="5">Không đội mũ bảo hiểm</SelectItem>
                    <SelectItem value="6">Dừng đỗ sai quy định</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Trạng thái
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger
                    className="text-sm"
                    onClick={handleSelectClick}
                  >
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="1">Đang xử lý</SelectItem>
                    <SelectItem value="2">Đã ghi nhận</SelectItem>
                    <SelectItem value="3">Cảnh báo gửi đi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilter}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Đặt lại bộ lọc
              </Button>
              <Button
                size="sm"
                onClick={handleApplyFilter}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
