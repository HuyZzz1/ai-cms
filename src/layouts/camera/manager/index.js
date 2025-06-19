import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CameraCard from "./CameraCard";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { FilterDropdown } from "./FilterDropdown";
import CreateCameraForm from "./modal/CreateCameraForm";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { getListCameraQuery } from "@/service/api/camera";
import { Pagination } from "@/components/ui/pagination";
import { CameraSkeleton } from "./CameraSkeleton";

export default function CameraManagement() {
  const modalRef = useRef();
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: "",
    regionId: "all",
    status: "all",
  });

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
  };

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.cameras, activeFilters, page],
    queryFn: () => {
      const filter = {};
      if (activeFilters.regionId !== "all") {
        filter.regionId = activeFilters.regionId;
      }
      if (activeFilters.status !== "all") {
        filter.status = activeFilters.status;
      }

      const queryParams = {
        page,
        limit: 12,
        ...(activeFilters.searchQuery && { search: activeFilters.searchQuery }),
        ...(Object.keys(filter).length > 0 && { filter }),
      };

      return getListCameraQuery(queryParams);
    },
  });

  const cameraList = data?.docs || [];

  return (
    <>
      <CreateCameraForm ref={modalRef} />
      <DashboardLayout>
        <DashboardNavbar breadcrumbRoute={["Giám sát", "Giám sát trực tiếp"]} />
        <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start sm:gap-2 w-full h-full">
          <h2 className="text-xl font-semibold text-left flex-1">
            Giám sát trực tiếp
          </h2>
          <div className="flex items-center gap-2.5 justify-end sm:flex-col sm:w-full  ">
            <FilterDropdown
              onApplyFilters={handleApplyFilters}
              initialFilters={activeFilters}
              className="sm:w-full"
            />
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-1 sm:w-full"
              onClick={() => modalRef.current?.open()}
            >
              <Plus className="h-4 w-4" />
              <span>Thêm Camera Mới</span>
            </Button>
          </div>
        </div>

        <main>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Hiển thị {cameraList.length} / {data?.docs.length} camera
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm-min:grid-cols-2 lg-min:grid-cols-3 xl-min:grid-cols-4 gap-3 sm-min:gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <CameraSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm-min:grid-cols-2 lg-min:grid-cols-3 xl-min:grid-cols-4 gap-3 sm-min:gap-4">
                {cameraList.map((camera) => (
                  <CameraCard key={camera.id} camera={camera} />
                ))}
              </div>

              {cameraList.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Không tìm thấy camera nào phù hợp với bộ lọc
                  </p>
                </div>
              )}
            </>
          )}

          {data?.totalPages > 1 && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </main>
      </DashboardLayout>
    </>
  );
}
