import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { QueryKey } from "@/service/constant";
import { getListCameraQuery } from "@/service/api/camera";
import { userRecoil } from "@/service/recoil/user";
import { useRecoilValue } from "recoil";
import L from "leaflet";

const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.whenReady(() => {
      requestAnimationFrame(() => {
        try {
          map.invalidateSize();
        } catch (error) {
          console.error("invalidateSize failed:", error);
        }
      });
    });
  }, [map]);

  return null;
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
  const [zoom, setZoom] = useState(14);
  const user = useRecoilValue(userRecoil);
  const [openedMarkerId, setOpenedMarkerId] = useState(null);
  const hoverTimeout = useRef(null);
  const markerRefs = useRef({});

  const { data } = useQuery({
    queryKey: [QueryKey.cameras],
    queryFn: () => getListCameraQuery({ page: 1, limit: 9999 }),
  });

  const regionIds = useMemo(() => {
    return user?.tenantId?.regions?.map((r) => r._id || r.id) ?? [];
  }, [user]);

  const filteredCameras = useMemo(() => {
    return (data?.docs || []).filter((cam) =>
      regionIds.includes(cam.districtId.regionId._id)
    );
  }, [data?.docs, regionIds]);

  const defaultCenter = useMemo(() => {
    const firstRegion = user?.tenantId?.regions?.[0];
    return firstRegion
      ? [Number(firstRegion.lat), Number(firstRegion.lng)]
      : [16.0471, 108.2062];
  }, [user]);

  const cameraList = filteredCameras;

  const cameraDetailData = useMemo(
    () =>
      cameraList?.map((cam) => ({
        id: cam._id,
        lat: cam.lat,
        lng: cam.lng,
        province: cam.districtId?.name || "Không rõ",
        locationName: cam.location,
        status: cam.status,
        device: cam.device,
      })),
    [cameraList]
  );

  const getColorByStatus = (status) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "inactive":
        return "#F44336";
      case "error":
        return "#BDBDBD";
      default:
        return "#BDBDBD";
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
        return "Không rõ";
    }
  };

  useEffect(() => {
    Object.entries(markerRefs.current).forEach(([id, ref]) => {
      if (!ref) return;
      if (id === openedMarkerId) ref.openPopup();
      else ref.closePopup();
    });
  }, [openedMarkerId]);

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Bản đồ Camera"]} />
      <h2 className="text-xl font-semibold mb-5">Bản đồ khu vực Camera</h2>

      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        className="w-full h-[800px] rounded-lg md:h-[500px]"
      >
        <MapResizer />
        <ZoomTracker onZoomChange={setZoom} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap contributors, © CARTO"
        />

        {cameraDetailData.map((cam, idx) => {
          const color = getColorByStatus(cam.status);

          const markerIcon = new L.DivIcon({
            className: "custom-marker",
            html: `<div style="width: 24px; height: 24px; background: ${color}; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [10, 10],
            iconAnchor: [6, 6],
          });

          return (
            <Marker
              key={`marker-${idx}`}
              position={[cam.lat, cam.lng]}
              icon={markerIcon}
              eventHandlers={{
                mouseover: () => {
                  if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                  setOpenedMarkerId(cam.id);
                },
                mouseout: () => {
                  hoverTimeout.current = setTimeout(() => {
                    if (openedMarkerId === cam.id) {
                      setOpenedMarkerId(null);
                    }
                  }, 300);
                },
              }}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[cam.id] = ref;
                }
              }}
            >
              <Popup
                autoClose={false}
                closeButton={false}
                eventHandlers={{
                  add: (e) => {
                    const popupEl = e.target.getElement();
                    const handleEnter = () => {
                      if (hoverTimeout.current)
                        clearTimeout(hoverTimeout.current);
                    };
                    const handleLeave = () => {
                      setOpenedMarkerId(null);
                    };
                    popupEl?.addEventListener("mouseenter", handleEnter);
                    popupEl?.addEventListener("mouseleave", handleLeave);
                    popupEl.__handlers = { handleEnter, handleLeave };
                  },
                  remove: (e) => {
                    const popupEl = e.target.getElement();
                    const handlers = popupEl.__handlers;
                    if (handlers && popupEl) {
                      popupEl.removeEventListener(
                        "mouseenter",
                        handlers.handleEnter
                      );
                      popupEl.removeEventListener(
                        "mouseleave",
                        handlers.handleLeave
                      );
                    }
                  },
                }}
              >
                <div className="text-sm">
                  <strong>Thiết bị:</strong> {cam.device}
                  <br />
                  ⚙️ {getName(cam.status)}
                  <br />
                  📍 {cam.locationName}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </DashboardLayout>
  );
}

export default CameraMap;
