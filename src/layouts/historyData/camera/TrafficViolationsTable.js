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
import { useState } from "react";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const extendedTrafficData = [
  {
    deviceId: "CAM_0975",
    location: "Ngã tư Giải Phóng – Đại La",
    area: "Hai Bà Trưng",
    coordinates: "21.0285, 105.8542",
    status: "active",
    lastUpdate: "03/06/2025 09:40",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0976",
    location: "Cổng công viên Thống Nhất",
    area: "Đống Đa",
    coordinates: "21.0227, 105.8363",
    status: "active",
    lastUpdate: "03/06/2025 09:39",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0977",
    location: "Cầu vượt Nguyễn Trãi",
    area: "Thanh Xuân",
    coordinates: "20.9955, 105.8077",
    status: "disconnected",
    lastUpdate: "03/06/2025 08:12",
    aiDetection: "-",
  },
  {
    deviceId: "CAM_0978",
    location: "Vòng xoay Ô Chợ Dừa",
    area: "Đống Đa",
    coordinates: "21.0314, 105.8235",
    status: "ai_warning",
    lastUpdate: "03/06/2025 09:42",
    aiDetection: "Có",
  },
  {
    deviceId: "CAM_0979",
    location: "Giao lộ Láng – Nguyễn Chí Thanh",
    area: "Ba Đình",
    coordinates: "21.0245, 105.8077",
    status: "maintenance",
    lastUpdate: "03/06/2025 07:10",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0980",
    location: "Cầu Long Biên",
    area: "Hoàn Kiếm",
    coordinates: "21.0367, 105.8542",
    status: "active",
    lastUpdate: "03/06/2025 09:35",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0981",
    location: "Ngã tư Hàng Xanh",
    area: "Hoàn Kiếm",
    coordinates: "21.0285, 105.8542",
    status: "ai_warning",
    lastUpdate: "03/06/2025 09:30",
    aiDetection: "Có",
  },
  {
    deviceId: "CAM_0982",
    location: "Cổng trường Đại học Bách Khoa",
    area: "Hai Bà Trưng",
    coordinates: "21.0067, 105.8431",
    status: "maintenance",
    lastUpdate: "03/06/2025 06:45",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0983",
    location: "Vòng xoay Phùng Khoang",
    area: "Nam Từ Liêm",
    coordinates: "21.0378, 105.7644",
    status: "disconnected",
    lastUpdate: "03/06/2025 07:22",
    aiDetection: "-",
  },
  {
    deviceId: "CAM_0984",
    location: "Ngã tư Thái Hà – Chùa Bộc",
    area: "Đống Đa",
    coordinates: "21.0314, 105.8235",
    status: "active",
    lastUpdate: "03/06/2025 09:41",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0985",
    location: "Cầu vượt Hoàng Minh Giám",
    area: "Cầu Giấy",
    coordinates: "21.0378, 105.7944",
    status: "ai_warning",
    lastUpdate: "03/06/2025 09:38",
    aiDetection: "Có",
  },
  {
    deviceId: "CAM_0986",
    location: "Ngã tư Nguyễn Văn Cừ – Long Biên",
    area: "Long Biên",
    coordinates: "21.0367, 105.8542",
    status: "active",
    lastUpdate: "03/06/2025 09:37",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0987",
    location: "Vòng xoay Nguyễn Khoái",
    area: "Hai Bà Trưng",
    coordinates: "21.0067, 105.8431",
    status: "maintenance",
    lastUpdate: "03/06/2025 05:30",
    aiDetection: "Không",
  },
  {
    deviceId: "CAM_0988",
    location: "Cổng sân bay Nội Bài",
    area: "Sóc Sơn",
    coordinates: "21.2187, 105.8067",
    status: "active",
    lastUpdate: "03/06/2025 09:43",
    aiDetection: "Có",
  },
  {
    deviceId: "CAM_0989",
    location: "Ngã tư Cầu Giấy",
    area: "Cầu Giấy",
    coordinates: "21.0378, 105.7944",
    status: "disconnected",
    lastUpdate: "03/06/2025 08:05",
    aiDetection: "-",
  },
];

export default function TrafficViolationsTable({
  data = extendedTrafficData,
  itemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Pagination handlers
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
      disconnected: "bg-red-100 text-red-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      ai_warning: "bg-blue-100 text-blue-800",
    };

    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const statusTextMap = {
      active: "Hoạt động",
      disconnected: "Mất kết nối",
      maintenance: "Bảo trì",
      ai_warning: "Cảnh báo AI",
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
          Tổng số thiết bị: {data.length} | Cập nhật lần cuối:{" "}
          {new Date().toLocaleString("vi-VN")}
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="w-full">
            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="bg-gray-50">
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
                    <TableRow
                      key={startIndex + index}
                      className="hover:bg-gray-50"
                    >
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
                    <span className="font-medium">{startIndex + 1}</span> đến{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, data.length)}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">{data.length}</span> kết quả
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Previous button */}
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

                  {/* Page numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === "..." ? (
                          <span className="px-3 py-1 text-gray-500">...</span>
                        ) : (
                          <Button
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
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

                  {/* Next button */}
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
      </div>
    </TooltipProvider>
  );
}
