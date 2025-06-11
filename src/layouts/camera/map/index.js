import { useState } from "react";
import MDTypography from "components/MDTypography";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

// ========== MOCK TỔNG CAMERA THEO TỈNH ==========
const mockData = [
  {
    province: "TP. Hà Nội",
    lat: 21.0285,
    lng: 105.8542,
    trafficCams: 63,
    speedCams: 78,
  },
  {
    province: "TP. Hồ Chí Minh",
    lat: 10.7626,
    lng: 106.6602,
    trafficCams: 49,
    speedCams: 38,
  },
  {
    province: "Đà Nẵng",
    lat: 16.0544,
    lng: 108.2022,
    trafficCams: 71,
    speedCams: 33,
  },
  {
    province: "Cần Thơ",
    lat: 10.0452,
    lng: 105.7469,
    trafficCams: 85,
    speedCams: 37,
  },
  {
    province: "Hải Phòng",
    lat: 20.8449,
    lng: 106.6881,
    trafficCams: 67,
    speedCams: 45,
  },
];

// ========== MOCK CHI TIẾT CAMERA ==========
const cameraDetailData = [
  {
    type: "traffic",
    lat: 21.0301,
    lng: 105.8525,
    province: "TP. Hà Nội",
    locationName: "Ngã tư Tràng Tiền",
  },
  {
    type: "traffic",
    lat: 21.0279,
    lng: 105.8569,
    province: "TP. Hà Nội",
    locationName: "Phố Huế - Hàng Bài",
  },
  {
    type: "speed",
    lat: 21.0293,
    lng: 105.8505,
    province: "TP. Hà Nội",
    locationName: "Đường Trần Quang Khải",
  },
  {
    type: "speed",
    lat: 21.0311,
    lng: 105.8557,
    province: "TP. Hà Nội",
    locationName: "Cầu Chương Dương",
  },
  {
    type: "traffic",
    lat: 10.7612,
    lng: 106.6581,
    province: "TP. Hồ Chí Minh",
    locationName: "Ngã tư Hàng Xanh",
  },
  {
    type: "speed",
    lat: 10.7634,
    lng: 106.6625,
    province: "TP. Hồ Chí Minh",
    locationName: "Cầu Sài Gòn",
  },
  {
    type: "speed",
    lat: 16.0556,
    lng: 108.2045,
    province: "Đà Nẵng",
    locationName: "Ngã ba Nguyễn Văn Linh",
  },
  {
    type: "traffic",
    lat: 16.0533,
    lng: 108.2001,
    province: "Đà Nẵng",
    locationName: "Cầu Rồng",
  },
];

const columns = [
  {
    Header: "Tổng quan giao thông",
    accessor: "province",
    Cell: ({ value }) => (
      <MDTypography variant="medium" fontWeight="medium">
        {value}
      </MDTypography>
    ),
  },
  {
    Header: "Camera giao thông",
    accessor: "trafficCams",
    align: "center",
  },
  {
    Header: "Camera tốc độ",
    accessor: "speedCams",
    align: "center",
  },
  {
    Header: "Tổng",
    accessor: "total",
    align: "center",
  },
];

function ZoomTracker({ setZoom }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

function CameraMap() {
  const [zoom, setZoom] = useState(5.5);

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbRoute={["Giám sát", "Bản đồ khu vực Camera"]}
      />
      <h2 className="text-xl font-semibold text-left flex-1 mb-5">
        Bản đồ khu vực Camera
      </h2>
      <MapContainer
        bounds={[
          [8.18, 102.14],
          [23.39, 109.46],
        ]}
        zoom={5.5}
        className="w-full h-[800px] rounded-lg md:h-[500px]"
      >
        <ZoomTracker setZoom={setZoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap contributors, © CARTO"
        />

        {zoom <= 8
          ? // HIỂN THỊ TỔNG CAMERA THEO TỈNH
            mockData.map((item, idx) => {
              const total = item.trafficCams + item.speedCams;
              return (
                <CircleMarker
                  key={`province-${idx}`}
                  center={[item.lat, item.lng]}
                  radius={10}
                  fillColor="#2E2EFF"
                  color="#2E2EFF"
                  fillOpacity={0.85}
                >
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    <span>
                      {item.province}
                      <br />
                      🚗 Giao thông: {item.trafficCams}
                      <br />⚡ Tốc độ: {item.speedCams}
                      <br />
                      📊 Tổng: {total}
                    </span>
                  </Tooltip>
                </CircleMarker>
              );
            })
          : // HIỂN THỊ CAMERA CHI TIẾT
            cameraDetailData.map((cam, idx) => (
              <CircleMarker
                key={idx}
                center={[cam.lat, cam.lng]}
                radius={10}
                pathOptions={{
                  color: cam.type === "traffic" ? "#90A4AE" : "#F06292",
                  fillColor: cam.type === "traffic" ? "#90A4AE" : "#F06292",
                  fillOpacity: 0.85,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span>
                    {cam.type === "traffic"
                      ? "🚗 Camera giao thông"
                      : "⚡ Camera tốc độ"}
                    <br />
                    {cam.province}
                    <br />
                    📍 {cam.locationName}
                  </span>
                </Tooltip>
              </CircleMarker>
            ))}
      </MapContainer>
    </DashboardLayout>
  );
}

export default CameraMap;
