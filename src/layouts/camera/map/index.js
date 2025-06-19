import { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { QueryKey } from "@/service/constant";
import { getListCameraQuery } from "@/service/api/camera";

const getName = (status) => {
  switch (status) {
    case "active":
      return "Đang hoạt động";
    case "inactive":
      return "Không hoạt động";
    case "error":
      return "Lỗi";
    default:
      return "Không rõ";
  }
};

const getColorByStatus = (status) => {
  switch (status) {
    case "active":
      return "#4CAF50";
    case "inactive":
      return "#90A4AE";
    case "error":
      return "#F44336";
    default:
      return "#BDBDBD";
  }
};

const ZoomTracker = ({ onZoomChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
};

function CameraMap() {
  const [zoom, setZoom] = useState(6);

  const { data } = useQuery({
    queryKey: [QueryKey.cameras],
    queryFn: () => getListCameraQuery({ page: 1, limit: 9999 }),
  });

  const cameraList = data?.docs || [];

  const summaryByProvince = useMemo(() => {
    const map = {};

    cameraList.forEach((cam) => {
      const regionName = cam.regionId?.name || "Không rõ";

      if (!map[regionName]) {
        map[regionName] = {
          province: regionName,
          lat: cam.regionId?.lat || cam.lat,
          lng: cam.regionId?.lng || cam.lng,
          active: 0,
          inactive: 0,
          error: 0,
        };
      }

      if (cam.status === "active") map[regionName].active++;
      else if (cam.status === "inactive") map[regionName].inactive++;
      else if (cam.status === "error") map[regionName].error++;
    });

    return Object.values(map);
  }, [cameraList]);

  const cameraDetailData = useMemo(
    () =>
      cameraList.map((cam) => ({
        lat: cam.lat,
        lng: cam.lng,
        province: cam.regionId?.name || "Không rõ",
        locationName: cam.location,
        status: cam.status,
      })),
    [cameraList]
  );

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Bản đồ Camera"]} />
      <h2 className="text-xl font-semibold mb-5">Bản đồ khu vực Camera</h2>

      <MapContainer
        center={[16.0471, 108.2062]}
        zoom={zoom}
        className="w-full h-[800px] rounded-lg md:h-[500px]"
      >
        <ZoomTracker onZoomChange={setZoom} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap contributors, © CARTO"
        />

        {zoom <= 10
          ? summaryByProvince.map((item, idx) => (
              <CircleMarker
                key={`province-${idx}`}
                center={[item.lat, item.lng]}
                radius={10}
                fillColor="#2E2EFF"
                color="#2E2EFF"
                fillOpacity={0.85}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -20]}
                  opacity={1}
                  permanent
                  sticky
                >
                  <span>
                    {item.province}
                    <br />
                    🟢 Hoạt động: {item.active}
                    <br />⚪ Không hoạt động: {item.inactive}
                    <br />
                    🔴 Lỗi: {item.error}
                    <br />
                    📊 Tổng: {item.active + item.inactive + item.error}
                  </span>
                </Tooltip>
              </CircleMarker>
            ))
          : cameraDetailData.map((cam, idx) => {
              const color = getColorByStatus(cam.status);

              return (
                <CircleMarker
                  key={idx}
                  center={[cam.lat, cam.lng]}
                  radius={10}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 0.85,
                  }}
                >
                  {zoom > 12 ? (
                    <Tooltip
                      key={`permanent-${idx}`}
                      direction="top"
                      offset={[0, -10]}
                      opacity={1}
                      sticky
                      permanent
                    >
                      <div>
                        ⚙️ {getName(cam.status)}
                        <br />
                        📍 {cam.locationName}
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      key={`hover-${idx}`}
                      direction="top"
                      offset={[0, -10]}
                      opacity={1}
                      sticky
                    >
                      <div>
                        ⚙️ {getName(cam.status)}
                        <br />
                        📍 {cam.locationName}
                      </div>
                    </Tooltip>
                  )}
                </CircleMarker>
              );
            })}
      </MapContainer>
    </DashboardLayout>
  );
}

export default CameraMap;
