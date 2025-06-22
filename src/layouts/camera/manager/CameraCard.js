import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import EditCameraForm from "./modal/EditCameraForm";
import { useRef } from "react";
import { message } from "@/components/ui/message";
import { useConfirmDialog } from "@/components/ConfirmDialogProvider";
import { deleteCameraQuery } from "@/service/api/camera";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/service/constant";
import { ErrorMessage } from "@/service/message";

export default function CameraCard({ camera }) {
  const editModal = useRef();
  const { showConfirm } = useConfirmDialog();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCameraQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.cameras] });
      message.success("Xoá camera thành công");
    },
    onError: (err) => {
      message.error(ErrorMessage[err.message] || err.message);
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      // case "Đang kiểm tra":
      //   return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "error":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return null;
    }
  };

  const getName = (status) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "error":
        return "Lỗi";
      default:
        return null;
    }
  };

  const onDelete = () => {
    mutate({
      id: camera.id,
    });
  };

  return (
    <>
      <EditCameraForm ref={editModal} />
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border">
        <div className="relative aspect-video bg-gray-100">
          <ReactPlayer
            url={camera.url}
            width="100%"
            height="100%"
            playing
            muted
            controls={false}
            light={false}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  mute: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  controls: 0,
                },
              },
            }}
          />
          {/* Live indicator */}
          {camera.status === "active" && (
            <div className="absolute top-2 left-2">
              <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusColor(camera.status)}`}
                >
                  Trạng thái: {getName(camera.status)}
                </Badge>
              </div>
              <p className="font-medium text-sm sm:text-base mb-1">
                Mã camera: {camera.device}
              </p>
              <p className="text-xs sm:text-sm  font-medium line-clamp-2">
                Khu vực: {camera.regionId?.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                Vị trí: {camera.location}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Cập nhật: {dayjs(camera.updatedAt).format("DD/MM/YYYY HH:mm")}
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
                <DropdownMenuItem className="cursor-pointer">
                  Xem chi tiết
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Ẩn camera</DropdownMenuItem> */}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => editModal.current?.open(camera)}
                >
                  Cập nhật
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() =>
                    showConfirm({
                      title: "Xác nhận xoá camera?",
                      description: `Bạn có chắc chắn muốn xoá camera ${camera.device}?`,
                      onConfirm: () => {
                        onDelete();
                      },
                    })
                  }
                >
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
