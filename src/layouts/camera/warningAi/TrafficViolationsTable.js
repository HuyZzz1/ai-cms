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
    time: "09:41",
    date: "03/06",
    violation: "Vượt đèn đỏ",
    location: "Ngã tư Quế Phong - Đê La",
    status: "Đang xử lý",
    camera: "CAM-041",
    evidence: "Hình ảnh",
    vehicleType: "Ô tô",
    color: "Trắng",
    licensePlate: "30A - 123.45",
  },
  {
    stt: 2,
    time: "09:40",
    date: "03/06",
    violation: "Lấn làn",
    location: "Cầu Chương Dương",
    status: "Đã ghi nhận",
    camera: "CAM-025",
    evidence: "Hình ảnh",
    vehicleType: "Xe máy",
    color: "Đen",
    licensePlate: "29B1 - 678.90",
  },
  {
    stt: 3,
    time: "09:39",
    date: "03/06",
    violation: "Xe quay đầu cấm",
    location: "Ngã 6 Ô Chợ Dừa",
    status: "Cảnh báo gửi đi",
    camera: "CAM-023",
    evidence: "Hình ảnh",
    vehicleType: "Ô tô",
    color: "Xanh",
    licensePlate: "30F - 456.78",
  },
  {
    stt: 4,
    time: "09:38",
    date: "03/06",
    violation: "Vượt tốc độ",
    location: "Đường Nguyễn Trãi",
    status: "Đang xử lý",
    camera: "CAM-109",
    evidence: "Hình ảnh",
    vehicleType: "Xe tải",
    color: "Xám",
    licensePlate: "51C - 789.12",
  },
  {
    stt: 5,
    time: "09:37",
    date: "03/06",
    violation: "Đi sai chiều",
    location: "Phố Huế",
    status: "Đã ghi nhận",
    camera: "CAM-032",
    evidence: "Hình ảnh",
    vehicleType: "Xe máy",
    color: "Đỏ",
    licensePlate: "29H1 - 234.56",
  },
  {
    stt: 6,
    time: "09:36",
    date: "03/06",
    violation: "Không đội mũ bảo hiểm",
    location: "Cầu Vĩnh Tuy",
    status: "Chờ xử lý",
    camera: "CAM-060",
    evidence: "Hình ảnh",
    vehicleType: "Xe máy",
    color: "Xanh",
    licensePlate: "29C1 - 111.22",
  },
  {
    stt: 7,
    time: "09:35",
    date: "03/06",
    violation: "Vượt đèn đỏ",
    location: "Ngã tư Hàng Xanh",
    status: "Đang xử lý",
    camera: "CAM-075",
    evidence: "Hình ảnh",
    vehicleType: "Ô tô",
    color: "Đỏ",
    licensePlate: "51A - 333.44",
  },
  {
    stt: 8,
    time: "09:34",
    date: "03/06",
    violation: "Dừng đỗ sai quy định",
    location: "Phố Bà Triệu",
    status: "Đã ghi nhận",
    camera: "CAM-088",
    evidence: "Hình ảnh",
    vehicleType: "Ô tô",
    color: "Bạc",
    licensePlate: "30B - 555.66",
  },
  {
    stt: 9,
    time: "09:33",
    date: "03/06",
    violation: "Vượt tốc độ",
    location: "Đại lộ Thăng Long",
    status: "Cảnh báo gửi đi",
    camera: "CAM-012",
    evidence: "Hình ảnh",
    vehicleType: "Xe máy",
    color: "Đen",
    licensePlate: "29D1 - 777.88",
  },
  {
    stt: 10,
    time: "09:32",
    date: "03/06",
    violation: "Lấn làn",
    location: "Cầu Nhật Tân",
    status: "Đang xử lý",
    camera: "CAM-045",
    evidence: "Hình ảnh",
    vehicleType: "Xe tải",
    color: "Trắng",
    licensePlate: "51D - 999.00",
  },
  {
    stt: 11,
    time: "09:31",
    date: "03/06",
    violation: "Chạy ngược chiều",
    location: "Phố Láng Hạ",
    status: "Chờ xử lý",
    camera: "CAM-067",
    evidence: "Hình ảnh",
    vehicleType: "Xe máy",
    color: "Vàng",
    licensePlate: "29E1 - 123.00",
  },
  {
    stt: 12,
    time: "09:30",
    date: "03/06",
    violation: "Vượt đèn đỏ",
    location: "Ngã tư Sở",
    status: "Đã ghi nhận",
    camera: "CAM-089",
    evidence: "Hình ảnh",
    vehicleType: "Ô tô",
    color: "Xám",
    licensePlate: "30C - 456.00",
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
      "Đang xử lý": "bg-yellow-100 text-yellow-800",
      "Đã ghi nhận": "bg-green-100 text-green-800",
      "Cảnh báo gửi đi": "bg-blue-100 text-blue-800",
      "Chờ xử lý": "bg-orange-100 text-orange-800",
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
        Tổng số vi phạm: {data.length} | Cập nhật lần cuối:{" "}
        {new Date().toLocaleString("vi-VN")}
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="w-full">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-semibold">
                    STT
                  </TableHead>
                  <TableHead className="font-semibold">THỜI GIAN</TableHead>
                  <TableHead className="font-semibold">LỖI VI PHẠM</TableHead>
                  <TableHead className="font-semibold">
                    VỊ TRÍ PHÁT HIỆN
                  </TableHead>
                  <TableHead className="font-semibold">TRẠNG THÁI</TableHead>
                  <TableHead className="text-center font-semibold">
                    CAMERA
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    BẰNG CHỨNG
                  </TableHead>
                  <TableHead className="font-semibold">
                    LOẠI PHƯƠNG TIỆN
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    MÀU
                  </TableHead>
                  <TableHead className="font-semibold">BIỂN SỐ XE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((violation, index) => (
                  <TableRow
                    key={startIndex + index}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="text-center font-medium">
                      {violation.stt}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="font-medium">{violation.time}</div>
                      <div className="text-gray-500 text-xs">
                        {violation.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="font-medium ">{violation.violation}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="font-medium">{violation.location}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${getStatusBadge(
                          violation.status
                        )} border-0`}
                      >
                        {violation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                      >
                        {violation.camera}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                      >
                        {violation.evidence}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium`}>
                        {violation.vehicleType}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{violation.color}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {violation.licensePlate}
                      </div>
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
