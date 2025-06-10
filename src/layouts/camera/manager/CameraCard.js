import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function CameraCard({ camera }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Tốt":
        return "bg-green-100 text-green-800 border-green-200";
      case "Đang kiểm tra":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Mất tín hiệu":
        return "bg-red-100 text-red-800 border-red-200";
      case "Cảnh báo AI":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border">
      <div className="relative aspect-video bg-gray-100">
        <img
          src={camera.image || "/placeholder.svg"}
          alt={`Camera feed ${camera.id}`}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {/* Live indicator */}
        {camera.status === "Tốt" && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(camera.status)}`}
              >
                Trạng thái: {camera.status}
              </Badge>
            </div>
            <p className="font-medium text-sm sm:text-base mb-1">
              Mã camera: {camera.id}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              Vị trí: {camera.location}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Cập nhật: {formatLastUpdated(camera.last_updated)}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0 ml-2"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem>Ẩn camera</DropdownMenuItem>
              <DropdownMenuItem>Cập nhật vị trí</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
