import { getListCameraQuery } from "@/service/api/camera";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const TrafficHotpots = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.cameras],
    queryFn: () => {
      const queryParams = {
        page: 1,
        limit: 9999,
        filter: {
          isHot: true,
        },
      };
      return getListCameraQuery(queryParams);
    },
  });

  const cameraList = data?.docs || [];

  return (
    <>
      {cameraList.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Các điểm nóng giao thông</h2>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
            {cameraList?.slice(0, 3).map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Link to={`/management/camera/${item.id}`}>
                  <CardContent className="p-0">
                    <div className="relative rounded-t-xl overflow-hidden">
                      <div className="w-full h-[220px] pointer-events-none">
                        <ReactPlayer
                          url={item.url}
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

                      {item?.status === "active" && (
                        <div className="absolute top-2 left-2">
                          <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            LIVE
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {`${item?.districtId?.name}: ${item?.location}`}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {index === 0
                          ? "Mật độ cao, thường có vi phạm vượt đèn đỏ và lấn làn."
                          : index === 1
                          ? "Ùn tắc giờ cao điểm"
                          : "Nút giao phức tạp"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Vi phạm hôm nay: 100
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
