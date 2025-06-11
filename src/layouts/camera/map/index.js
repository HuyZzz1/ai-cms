import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

export default function CameraMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const cameraMarkers = [
    {
      id: 1,
      number: "127",
      x: 48,
      y: 45,
      district: "Hoàn Kiếm",
      location: "Phố cổ Hà Nội",
      type: "speed",
    },
    {
      id: 2,
      number: "89",
      x: 45,
      y: 42,
      district: "Ba Đình",
      location: "Lăng Chủ tịch Hồ Chí Minh",
      type: "traffic",
    },
    {
      id: 3,
      number: "156",
      x: 52,
      y: 48,
      district: "Hai Bà Trưng",
      location: "Phố Bà Triệu",
      type: "speed",
    },
    {
      id: 4,
      number: "203",
      x: 46,
      y: 50,
      district: "Đống Đa",
      location: "Ngã tư Khâm Thiên",
      type: "traffic",
    },
    {
      id: 5,
      number: "78",
      x: 42,
      y: 38,
      district: "Tây Hồ",
      location: "Hồ Tây",
      type: "speed",
    },
    {
      id: 6,
      number: "134",
      x: 50,
      y: 40,
      district: "Cầu Giấy",
      location: "Đại học Quốc gia",
      type: "traffic",
    },
    {
      id: 7,
      number: "91",
      x: 48,
      y: 52,
      district: "Thanh Xuân",
      location: "Ngã tư Nhổn",
      type: "speed",
    },
    {
      id: 8,
      number: "167",
      x: 54,
      y: 50,
      district: "Hoàng Mai",
      location: "Giải Phóng",
      type: "traffic",
    },
    {
      id: 9,
      number: "45",
      x: 55,
      y: 42,
      district: "Long Biên",
      location: "Cầu Long Biên",
      type: "speed",
    },
    {
      id: 10,
      number: "112",
      x: 44,
      y: 35,
      district: "Nam Từ Liêm",
      location: "Mỹ Đình",
      type: "traffic",
    },
    {
      id: 11,
      number: "73",
      x: 46,
      y: 32,
      district: "Bắc Từ Liêm",
      location: "Cầu Nhật Tân",
      type: "speed",
    },
    {
      id: 12,
      number: "198",
      x: 40,
      y: 55,
      district: "Hà Đông",
      location: "Quang Trung",
      type: "traffic",
    },

    // Các huyện ngoại thành
    {
      id: 13,
      number: "34",
      x: 48,
      y: 25,
      district: "Sóc Sơn",
      location: "Trung tâm Sóc Sơn",
      type: "speed",
    },
    {
      id: 14,
      number: "67",
      x: 58,
      y: 35,
      district: "Đông Anh",
      location: "QL1A",
      type: "traffic",
    },
    {
      id: 15,
      number: "52",
      x: 62,
      y: 45,
      district: "Gia Lâm",
      location: "Sân bay Nội Bài",
      type: "speed",
    },
    {
      id: 16,
      number: "28",
      x: 52,
      y: 20,
      district: "Mê Linh",
      location: "Trung tâm Mê Linh",
      type: "traffic",
    },
    {
      id: 17,
      number: "41",
      x: 35,
      y: 30,
      district: "Ba Vì",
      location: "Núi Ba Vì",
      type: "speed",
    },
    {
      id: 18,
      number: "63",
      x: 38,
      y: 40,
      district: "Phúc Thọ",
      location: "QL32",
      type: "traffic",
    },
    {
      id: 19,
      number: "29",
      x: 40,
      y: 32,
      district: "Dan Phượng",
      location: "Trung tâm Dan Phượng",
      type: "speed",
    },
    {
      id: 20,
      number: "85",
      x: 35,
      y: 45,
      district: "Hoài Đức",
      location: "QL6",
      type: "traffic",
    },
    {
      id: 21,
      number: "37",
      x: 30,
      y: 50,
      district: "Quốc Oai",
      location: "Trung tâm Quốc Oai",
      type: "speed",
    },
    {
      id: 22,
      number: "56",
      x: 32,
      y: 55,
      district: "Thạch Thất",
      location: "QL21",
      type: "traffic",
    },
    {
      id: 23,
      number: "44",
      x: 35,
      y: 65,
      district: "Chương Mỹ",
      location: "Trung tâm Chương Mỹ",
      type: "speed",
    },
    {
      id: 24,
      number: "71",
      x: 45,
      y: 65,
      district: "Thanh Oai",
      location: "QL1A",
      type: "traffic",
    },
    {
      id: 25,
      number: "38",
      x: 55,
      y: 65,
      district: "Thường Tín",
      location: "Trung tâm Thường Tín",
      type: "speed",
    },
    {
      id: 26,
      number: "62",
      x: 65,
      y: 60,
      district: "Phú Xuyên",
      location: "QL1A",
      type: "traffic",
    },
    {
      id: 27,
      number: "33",
      x: 60,
      y: 70,
      district: "Ứng Hòa",
      location: "Trung tâm Ứng Hòa",
      type: "speed",
    },
    {
      id: 28,
      number: "49",
      x: 50,
      y: 75,
      district: "Mỹ Đức",
      location: "QL21B",
      type: "traffic",
    },
  ];
  const filteredMarkers = cameraMarkers.filter(
    (marker) =>
      marker.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marker.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMarkerColor = (type) => {
    return type === "speed" ? "bg-rose-400" : "bg-slate-400";
  };

  const getMarkerHoverColor = (type) => {
    return type === "speed" ? "bg-rose-500" : "bg-slate-500";
  };

  const selected = cameraMarkers.find((m) => m.id === selectedMarker);

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Bản đồ khu vực"]} />
      <div
        className="relative w-full overflow-hidden pb-36 sm:pb-0"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('/images/hanoi-map.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-4 mt-2.5">
          <h1 className="text-xl font-semibold text-gray-700 mb-3">
            Camera Giao Thông Hà Nội
          </h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm quận, huyện hoặc địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 bg-white/70 text-gray-600"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-200 bg-white/70 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>

        {filteredMarkers.map((marker) => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-0"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onClick={() =>
              setSelectedMarker(selectedMarker === marker.id ? null : marker.id)
            }
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-xs shadow-md border-2 border-white/80 transition-all duration-300 z-0 ${
                selectedMarker === marker.id
                  ? `${getMarkerHoverColor(marker.type)} scale-110 shadow-lg`
                  : getMarkerColor(marker.type)
              } z-0 sm-min:scale-100 scale-90`}
            >
              {marker.number}
            </div>

            {selectedMarker === marker.id && (
              <div className="hidden sm-min:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 px-3 py-2 text-sm font-medium text-gray-700 whitespace-nowrap z-20 max-w-48 z-50">
                <div className="font-semibold text-gray-800">
                  {marker.district}
                </div>
                <div className="text-gray-600 text-xs">{marker.location}</div>
                <div
                  className={`text-xs mt-1 ${
                    marker.type === "speed" ? "text-rose-500" : "text-slate-500"
                  }`}
                >
                  {marker.type === "speed"
                    ? "Camera tốc độ"
                    : "Camera giao thông"}
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/95" />
              </div>
            )}
          </div>
        ))}

        {selected && (
          <div className="fixed bottom-40 inset-x-4 z-30 sm-min:hidden bg-white/90 rounded-xl p-4 shadow-lg border border-gray-200/50">
            <div className="font-semibold text-gray-800">
              {selected.district}
            </div>
            <div className="text-gray-600 text-xs">{selected.location}</div>
            <div
              className={`text-xs mt-1 ${
                selected.type === "speed" ? "text-rose-500" : "text-slate-500"
              }`}
            >
              {selected.type === "speed"
                ? "Camera tốc độ"
                : "Camera giao thông"}
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-0 right-0 z-20 px-4 flex flex-col gap-3 sm-min:flex-row  sm-min:px-8">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-3 w-full sm-min:w-auto">
              <h3 className="font-medium text-sm mb-2 text-gray-600">
                Chú thích
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <span className="text-gray-600">Camera giao thông</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <span className="text-gray-600">Camera tốc độ</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-3 w-full sm-min:w-auto">
              <div className="text-sm font-medium text-gray-700">Thống kê</div>
              <div className="text-xs text-gray-500 mt-1">
                Tổng: {filteredMarkers.length} camera
              </div>
              <div className="text-xs text-gray-500 flex gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                  {filteredMarkers.filter((m) => m.type === "speed").length}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  {filteredMarkers.filter((m) => m.type === "traffic").length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 bottom-10 z-20 translate-x-[-50%] sm:bottom-[115px]">
          <Button
            className="bg-white/90 text-gray-700 sm:!text-xs sm:px-3 sm:py-1 hover:bg-white shadow-md rounded-full px-6 py-3 font-medium text-base border border-gray-200/50 backdrop-blur-sm w-full sm-min:w-auto"
            onClick={() =>
              alert("Chức năng báo cáo camera mới sẽ được triển khai tại đây")
            }
          >
            {" "}
            <MapPin className="h-4 w-4 mr-2 text-gray-600 " /> Báo cáo camera
            mới{" "}
          </Button>
        </div>

        <div className="absolute bottom-32 right-4 flex flex-col gap-2 z-20">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/80 shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <Navigation className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="absolute bottom-1 right-4 text-xs text-gray-500 z-20">
          <span>Dữ liệu bản đồ ©2025 | </span>
          <a href="#" className="underline hover:text-gray-600">
            Điều khoản
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
