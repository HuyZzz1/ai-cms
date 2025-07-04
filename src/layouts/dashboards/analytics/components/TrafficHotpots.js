import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { getTrafficHotspotsQuery } from "@/service/api/dashboard";

const TrafficHotpots = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.trafficHotspots],
    queryFn: () => getTrafficHotspotsQuery(),
  });

  const cameraList = data?.data || [];

  return (
    <>
      {cameraList.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Các điểm nóng giao thông</h2>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
            {cameraList.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Link to={`/management/camera/${item.cameraId}`}>
                  <CardContent className="p-0">
                    <div className="relative rounded-t-xl overflow-hidden">
                      <div className="w-full h-[220px] pointer-events-none">
                        <ReactPlayer
                          url={item.cameraUrl}
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
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">
                        {item?.cameraName}
                      </h3>
                      <h3 className="font-semibold text-sm mb-2">
                        {`${item?.district}: ${item?.location}`}
                      </h3>
                      {/* <p className="text-sm text-gray-600 mb-3">
                        {index === 0
                          ? "Mật độ cao, thường có vi phạm vượt đèn đỏ và lấn làn."
                          : index === 1
                          ? "Ùn tắc giờ cao điểm"
                          : "Nút giao phức tạp"}
                      </p> */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Vi phạm hôm nay: {item?.count || 0}
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Điểm nóng
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TrafficHotpots;
