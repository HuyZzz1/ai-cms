"use client";

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
import { Filter, ChevronDown, Search, Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function FilterDropdown({
  onApplyFilters,
  initialFilters,
  className = "",
}) {
  const defaultFilters = {
    searchQuery: "",
    districtFilter: "all",
    timeFilter: "today",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    type: "all",
    status: "all",
  };

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filters, setFilters] = useState(initialFilters || defaultFilters);
  const [date, setDate] = useState({ from: undefined, to: undefined });
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Kiểm tra xem có phải đang click vào Select dropdown hoặc Calendar không
        const isSelectDropdown =
          event.target.closest("[data-radix-popper-content-wrapper]") ||
          event.target.closest("[data-radix-select-content]") ||
          event.target.closest("[data-radix-select-viewport]") ||
          event.target.closest("[data-radix-popover-content]");

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

  useEffect(() => {
    // Update filters when date changes
    setFilters((prev) => ({
      ...prev,
      dateRange: date,
    }));
  }, [date]);

  const handleSelectClick = (e) => {
    e.stopPropagation();
  };

  const handleResetFilter = () => {
    setFilters(defaultFilters);
    setDate({ from: undefined, to: undefined });
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
          className={cn(
            "absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50",
            isMobile ? "left-0 right-0 w-full" : "right-0 w-80"
          )}
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
                    placeholder="Tìm kiếm theo biển số xe"
                    className="pl-10 text-sm"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleFilterChange("searchQuery", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Date Range Picker */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  KHOẢNG THỜI GIAN
                </label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal text-sm",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd/MM/yyyy", { locale: vi })}{" "}
                              - {format(date.to, "dd/MM/yyyy", { locale: vi })}
                            </>
                          ) : (
                            format(date.from, "dd/MM/yyyy", { locale: vi })
                          )
                        ) : (
                          <span>Chọn khoảng thời gian</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 w-auto"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                      avoidCollisions={true}
                      collisionPadding={isMobile ? 16 : 8}
                    >
                      <div
                        className={cn(isMobile && "max-h-[70vh] overflow-auto")}
                      >
                        <CalendarComponent
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={isMobile ? 1 : 2}
                          locale={vi}
                          className={cn(isMobile && "w-full")}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  Khu vực
                </label>
                <Select
                  value={filters.districtFilter}
                  onValueChange={(value) =>
                    handleFilterChange("districtFilter", value)
                  }
                >
                  <SelectTrigger
                    className="text-sm"
                    onClick={handleSelectClick}
                  >
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả quận/huyện</SelectItem>
                    <SelectItem value="hoankiem">Quận Hoàn Kiếm</SelectItem>
                    <SelectItem value="dongda">Quận Đống Đa</SelectItem>
                    <SelectItem value="haibatrung">
                      Quận Hai Bà Trưng
                    </SelectItem>
                    <SelectItem value="caugiay">Quận Cầu Giấy</SelectItem>
                    <SelectItem value="badinh">Quận Ba Đình</SelectItem>
                    <SelectItem value="tayho">Quận Tây Hồ</SelectItem>
                    <SelectItem value="hoangmai">Quận Hoàng Mai</SelectItem>
                    <SelectItem value="longbien">Quận Long Biên</SelectItem>
                    <SelectItem value="thanxuan">Quận Thanh Xuân</SelectItem>
                    <SelectItem value="namtuliem">Quận Nam Từ Liêm</SelectItem>
                    <SelectItem value="bactuliem">Quận Bắc Từ Liêm</SelectItem>
                    <SelectItem value="hadong">Quận Hà Đông</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                  TRẠNG THÁI
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
                    <SelectItem value="1">Hoạt động</SelectItem>
                    <SelectItem value="2">Mất kết nối</SelectItem>
                    <SelectItem value="3">Cảnh báo AI</SelectItem>
                    <SelectItem value="3">Bảo trì</SelectItem>
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
