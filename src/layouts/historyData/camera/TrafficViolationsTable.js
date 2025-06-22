"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";

export default function TrafficViolationsTable({
  data = [],
  itemsPerPage = 10,
  currentPage = 1,
  setCurrentPage = () => {},
  totalItems = 0,
}) {
  // Memoized current page data
  const currentData = useMemo(() => {
    return data;
  }, [data]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      error: "bg-orange-100 text-orange-800",
    };

    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const statusTextMap = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      error: "Lỗi",
    };

    return statusTextMap[status] || status;
  };

  const copyCoordinates = (coordinates) => {
    navigator.clipboard.writeText(coordinates);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5">
        <div className="text-sm text-gray-500">
          Tổng số thiết bị: {totalItems} | Cập nhật lần cuối:{" "}
          {new Date().toLocaleString("vi-VN")}
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-semibold">
                    STT
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    MÃ THIẾT BỊ
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    VỊ TRÍ LẮP ĐẶT
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    KHU VỰC
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    TỌA ĐỘ
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    TRẠNG THÁI
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    LẦN CẬP NHẬT CUỐI
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    AI
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((device, index) => (
                  <TableRow key={index + 1} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">
                      {device.stt}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-blue-600 p-4">
                      {device.deviceId}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {device.location}
                    </TableCell>
                    <TableCell className="text-sm">{device.area}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{device.coordinates}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-200"
                              onClick={() =>
                                copyCoordinates(device.coordinates)
                              }
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sao chép tọa độ</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${getStatusBadge(
                          device.status
                        )} border-0 font-medium`}
                      >
                        {getStatusText(device.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {device.lastUpdate}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`font-medium ${
                          device.aiDetection === "Không"
                            ? "text-red-600"
                            : device.aiDetection === "Có"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {device.aiDetection}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 md:flex-col md:items-start md:gap-2.5">
              <div className="flex items-center text-sm text-gray-700">
                <span>
                  Hiển thị{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  đến{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{" "}
                  trong tổng số{" "}
                  <span className="font-medium">{totalItems}</span> kết quả
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Trước</span>
                </Button>
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-1 text-gray-500">...</span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className="min-w-[40px]"
                        >
                          {page}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1"
                >
                  <span>Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
