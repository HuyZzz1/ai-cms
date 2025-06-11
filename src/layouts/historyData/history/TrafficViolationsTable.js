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
import { ChevronLeft, ChevronRight } from "lucide-react";

const extendedTrafficData = [
  {
    stt: 1,
    time: "03/06/2025 08:12",
    camera: "CAM_1023",
    area: "Hoàn Kiếm",
    licensePlate: "30F-123.45",
    eventType: "Vi phạm tốc độ",
    status: "Chưa xử lý",
  },
  {
    stt: 2,
    time: "02/06/2025 21:35",
    camera: "CAM_0033",
    area: "Đống Đa",
    licensePlate: "29A-456.78",
    eventType: "Cảnh báo AI",
    status: "Đã xử lý",
  },
  {
    stt: 3,
    time: "01/06/2025 15:00",
    camera: "CAM_0874",
    area: "Long Biên",
    licensePlate: "Không xác định",
    eventType: "Mất kết nối",
    status: "Đang xử lý",
  },
  {
    stt: 4,
    time: "01/06/2025 10:22",
    camera: "CAM_0091",
    area: "Hai Bà Trưng",
    licensePlate: "30E-789.01",
    eventType: "Lưu lượng cao",
    status: "Đang xử lý",
  },
  {
    stt: 5,
    time: "31/05/2025 16:45",
    camera: "CAM_0156",
    area: "Ba Đình",
    licensePlate: "51A-234.56",
    eventType: "Vượt đèn đỏ",
    status: "Chưa xử lý",
  },
  {
    stt: 6,
    time: "31/05/2025 14:30",
    camera: "CAM_0789",
    area: "Cầu Giấy",
    licensePlate: "29B-567.89",
    eventType: "Lấn làn",
    status: "Đã xử lý",
  },
  {
    stt: 7,
    time: "30/05/2025 09:15",
    camera: "CAM_0234",
    area: "Thanh Xuân",
    licensePlate: "30C-890.12",
    eventType: "Dừng đỗ sai",
    status: "Đang xử lý",
  },
  {
    stt: 8,
    time: "30/05/2025 07:20",
    camera: "CAM_0567",
    area: "Hoàng Mai",
    licensePlate: "51D-345.67",
    eventType: "Quay đầu cấm",
    status: "Chưa xử lý",
  },
  {
    stt: 9,
    time: "29/05/2025 18:40",
    camera: "CAM_0890",
    area: "Tây Hồ",
    licensePlate: "29E-678.90",
    eventType: "Không đội mũ BH",
    status: "Đã xử lý",
  },
  {
    stt: 10,
    time: "29/05/2025 12:55",
    camera: "CAM_0123",
    area: "Nam Từ Liêm",
    licensePlate: "30F-901.23",
    eventType: "Vượt tốc độ",
    status: "Đang xử lý",
  },
  {
    stt: 11,
    time: "28/05/2025 20:10",
    camera: "CAM_0456",
    area: "Bắc Từ Liêm",
    licensePlate: "51G-234.56",
    eventType: "Chạy ngược chiều",
    status: "Chưa xử lý",
  },
  {
    stt: 12,
    time: "28/05/2025 11:25",
    camera: "CAM_0678",
    area: "Hà Đông",
    licensePlate: "29H-567.89",
    eventType: "Cảnh báo AI",
    status: "Đã xử lý",
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
      "Chưa xử lý": "bg-red-100 text-red-800",
      "Đã xử lý": "bg-green-100 text-green-800",
      "Đang xử lý": "bg-yellow-100 text-yellow-800",
    };

    return statusMap[status] || "bg-gray-100 text-gray-800";
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
    <div className="flex flex-col gap-5">
      <div className="text-sm text-gray-500">
        Tổng số sự kiện: {data.length} | Cập nhật lần cuối:{" "}
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
                    THỜI GIAN
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    CAMERA
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    KHU VỰC
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    BIỂN SỐ
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    LOẠI SỰ KIỆN
                  </TableHead>
                  <TableHead className="font-semibold whitespace-nowrap">
                    TRẠNG THÁI
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((violation, index) => (
                  <TableRow
                    key={startIndex + index}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="text-sm font-medium p-4">
                      <div className="font-medium ">{violation.time}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-blue-600">
                      <div className="font-medium ">{violation.camera}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      <div className="font-medium ">{violation.area}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="font-medium ">
                        {violation.licensePlate}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      <div className="font-medium ">{violation.eventType}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${getStatusBadge(
                          violation.status
                        )} border-0 font-medium`}
                      >
                        {violation.status}
                      </Badge>
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
                  Hiển thị <span className="font-medium">{startIndex + 1}</span>{" "}
                  đến{" "}
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
  );
}
