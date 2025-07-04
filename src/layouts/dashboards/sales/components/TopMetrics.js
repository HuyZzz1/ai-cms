import { getDashboardOverviewAnalyticsQuery } from "@/service/api/dashboard";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, MousePointer } from "lucide-react";

const TopMetrics = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.dashboardOverviewAnalytics],
    queryFn: () => getDashboardOverviewAnalyticsQuery(),
  });

  const statistic = data?.data || {};

  const thisWeek = statistic?.thisWeek?.handlingRate ?? 0;
  const lastWeek = statistic?.lastWeek?.handlingRate ?? 0;

  const rateChange =
    lastWeek === 0 ? 0 : ((thisWeek - lastWeek) / lastWeek) * 100;

  const isZeroChange = Math.abs(rateChange) < 0.05;
  const rateChangeText = isZeroChange
    ? "+0% so với tuần trước"
    : `${rateChange > 0 ? "+" : ""}${rateChange.toFixed(1)}% so với tuần trước`;
  const rateChangeColor = isZeroChange
    ? "text-green-600"
    : rateChange > 0
    ? "text-green-600"
    : "text-red-600";

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-6 mb-8">
      {/* Vehicle Traffic Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Tổng lượt phương tiện hôm nay
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistic?.traffic?.today ?? 0}
          </div>
          <p
            className={`text-xs ${
              statistic?.traffic?.yesterday >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {statistic?.traffic?.yesterday >= 0
              ? `+${statistic?.traffic?.yesterday}`
              : `${statistic?.traffic?.yesterday}`}
            % so với hôm qua
          </p>
        </CardContent>
      </Card>

      {/* AI Violation Detection */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Số vi phạm AI phát hiện
          </CardTitle>
          <Eye className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistic?.violation?.total ?? 0}
          </div>
          <p
            className={`text-xs ${
              statistic?.violation?.yesterday >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {statistic?.violation?.yesterday >= 0
              ? `+${statistic?.violation?.yesterday}`
              : `${statistic?.violation?.yesterday}`}
            % so với hôm qua
          </p>
        </CardContent>
      </Card>

      {/* Handling Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Tỷ lệ xử lý vi phạm (%)
          </CardTitle>
          <MousePointer className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{thisWeek}%</div>
          <p className={`text-xs ${rateChangeColor}`}>{rateChangeText}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopMetrics;
