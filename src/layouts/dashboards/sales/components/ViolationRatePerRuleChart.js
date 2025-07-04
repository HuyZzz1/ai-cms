import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardViolationRatePerRuleQuery } from "@/service/api/dashboard";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Danh sách màu định sẵn để hiển thị cho các loại vi phạm
const COLORS = [
  "#3b82f6", // xanh dương
  "#ef4444", // đỏ
  "#22c55e", // xanh lá
  "#8b5cf6", // tím đậm
  "#a855f7", // tím nhạt
  "#f97316", // cam
  "#0ea5e9", // xanh cyan
];

const ViolationRatePerRuleChart = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.dashboardViolationRatePerRule],
    queryFn: () => getDashboardViolationRatePerRuleQuery(),
  });

  const pieData =
    data?.data?.map((item, index) => ({
      name: item.ruleName,
      value: item.percentage,
      color: COLORS[index % COLORS.length],
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Tỷ lệ loại vi phạm giao thông
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const { name, value } = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-300 shadow px-3 py-2 rounded text-sm font-medium">
                          {`${name} : ${value.toFixed(1)}%`}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Vi phạm phổ biến nhất là <strong>{pieData[0]?.name || "..."}</strong>{" "}
          với tỷ lệ <strong>{pieData[0]?.value?.toFixed(1) || "0"}%</strong>.
        </p>
      </CardContent>
    </Card>
  );
};

export default ViolationRatePerRuleChart;
