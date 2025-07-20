import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getTrafficHotspotsQuery } from "@/service/api/dashboard";
import HlsPlayer from "@/layouts/camera/manager/HlsPlayer";

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
                <Link to={`/management/camera/${item?.cameraId}`}>
                  <CardContent className="p-0">
                    <div className="relative rounded-t-xl overflow-hidden">
                      <div className="w-full h-[250px] pointer-events-none">
                        <HlsPlayer
                          src={item?.cameraUrl}
                          width="100%"
                          height={300}
                          controls={false}
                          autoPlay={true}
                          muted={true}
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
