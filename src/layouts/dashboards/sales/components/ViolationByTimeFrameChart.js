import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardViolationByTimeFrameQuery } from "@/service/api/dashboard";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";

const ViolationByTimeFrameChart = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.dashboardViolationByTimeFrame],
    queryFn: () => getDashboardViolationByTimeFrameQuery(),
  });

  const raw = data?.data || [];

  // Tính tổng để chuyển thành phần trăm
  const total = raw.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...raw.map((item) => item.count), 1); // để tránh chia 0

  // Chuyển dữ liệu sang format { age, value }
  const ageData = raw.map((item) => ({
    age: `${item.timeSlot?.replace("-", "h-")}h`,
    value: total > 0 ? (item.count / total) * 100 : 0,
    rawCount: item.count,
    width: (item.count / maxCount) * 100, // dùng để tính chiều rộng thanh
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Tỷ lệ vi phạm theo khung giờ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ageData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 w-16">{item.age}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                <div
                  className="bg-gray-800 h-2 rounded-full"
                  style={{ width: `${item.width}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-10 text-right">
                {item.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationByTimeFrameChart;
