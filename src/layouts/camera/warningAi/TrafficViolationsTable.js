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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function TrafficViolationsTable({
  data = [],
  itemsPerPage = 10,
  currentPage = 1,
  setCurrentPage = () => {},
  totalItems = 0,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const convertStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lí";
      case "processing":
        return "Đang xử lí";
      case "resolved":
        return "Đã ghi nhận";
      case "ignored":
        return "Bỏ qua";
      case "sent_warning":
        return "Cảnh báo gửi đi";

      default:
        return "Không rõ";
    }
  };

  const convertVehicleType = (type) => {
    switch (type) {
      case "car":
        return "Ô tô";
      case "motorbike":
        return "Xe máy";
      case "truck":
        return "Xe tải";
      default:
        return type || "-";
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      processing: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      sent_warning: "bg-blue-100 text-blue-800",
      pending: "bg-orange-100 text-orange-800",
      ignored: "bg-gray-100 text-gray-800",
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
    <>
      <div className="flex flex-col gap-5">
        <div className="text-sm text-gray-500">
          Tổng số vi phạm: {totalItems} | Cập nhật lần cuối:{" "}
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
                  {currentData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center py-6 text-gray-500"
                      >
                        Không có dữ liệu vi phạm nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentData.map((violation, index) => (
                      <TableRow key={index + 1} className="hover:bg-gray-50">
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
                          <div className="font-medium ">
                            {violation.violation}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="font-medium">
                            {violation.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`${getStatusBadge(
                              violation.status
                            )} border-0`}
                          >
                            {convertStatus(violation.status)}
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
                            onClick={() => {
                              setSelectedImages(violation.evidences || []);
                              setPhotoIndex(0);
                              setModalOpen(true);
                            }}
                          >
                            {violation.evidence}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium`}>
                            {convertVehicleType(violation.vehicleType)}
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

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

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Tạo mới Camera"
        overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-[9999]"
        className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-xl mx-auto mt-20 outline-none z-[10000]"
      >
        <h2 className="text-lg font-semibold mb-4">Hình ảnh vi phạm</h2>

        {selectedImages.length > 0 ? (
          <div className="flex items-center gap-2.5 flex-wrap">
            {selectedImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`evidence-${idx}`}
                className="w-[250px] h-[150px] object-cover border rounded cursor-zoom-in"
                onClick={() => {
                  setPhotoIndex(idx);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">Không có hình ảnh.</div>
        )}

        <div className="mt-6 text-right">
          <Button onClick={() => setModalOpen(false)}>Đóng</Button>
        </div>
      </Modal>
      {lightboxOpen && (
        <Lightbox
          style={{ zIndex: 100000 }}
          mainSrc={selectedImages[photoIndex]}
          nextSrc={selectedImages[(photoIndex + 1) % selectedImages.length]}
          prevSrc={
            selectedImages[
              (photoIndex + selectedImages.length - 1) % selectedImages.length
            ]
          }
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + selectedImages.length - 1) % selectedImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % selectedImages.length)
          }
          imageTitle={`Ảnh ${photoIndex + 1} / ${selectedImages.length}`}
          enableZoom={true}
        />
      )}
    </>
  );
}
