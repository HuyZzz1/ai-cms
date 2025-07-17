import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { getCameraDetailQuery } from "@/service/api/camera";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

export default function CameraDetail() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: [QueryKey.cameraDetail, id],
    queryFn: () => getCameraDetailQuery(id).then((res) => res.data),
    enabled: !!id,
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

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar breadcrumbRoute={["Camera", "Chi tiết"]} />

        <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
          <h2 className="text-xl font-semibold text-left flex-1">
            Thiết bị: {data?.device}
          </h2>
        </div>

        <div className="flex justify-between gap-10">
          <div className="w-[60%] h-[500px] relative ">
            <div className="w-full h-full pointer-events-none rounded-xl">
              <iframe
                src={data?.url}
                style={{ width: "100%", height: 800 }}
                className="rounded-xl"
              />
              {data?.status === "active" && (
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(data?.status)}`}
              >
                Trạng thái: {getName(data?.status)}
              </Badge>
            </div>
            <p className="font-medium text-md sm:text-base mb-1">
              Mã camera: {data?.device}
            </p>
            <p className="text-sm  font-medium ">
              Khu vực: {data?.districtId?.name}
            </p>
            <p className="text-sm font-medium ">Vị trí: {data?.location}</p>
            <p className="text-sm text-gray-600 mt-1">
              Cập nhật: {dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
