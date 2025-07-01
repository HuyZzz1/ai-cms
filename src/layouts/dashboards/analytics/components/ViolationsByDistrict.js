import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getViolationsByDistrictQuery } from "@/service/api/camera";
import { QueryKey } from "@/service/constant";
import { useQuery } from "@tanstack/react-query";

const ViolationsByDistrict = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.violationsByDistrict],
    queryFn: () => getViolationsByDistrictQuery().then((res) => res.data),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thống kê vi phạm</CardTitle>
        <CardDescription>Dữ liệu vi phạm và mức phạt ước tính</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <span>Quận/Huyện</span>
            <span className="text-center">Vi phạm</span>
            <span className="text-center">Mức phạt (VNĐ)</span>
            <span className="text-center">Tỷ lệ (%)</span>
          </div>

          {data?.length === 0 && (
            <div className="text-center  text-gray-500 italic py-4">
              Chưa có dữ liệu
            </div>
          )}

          {data?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-gray-100"
            >
              <span className="font-medium ">{item.districtName}</span>
              <span className="text-red-600 font-medium text-center ">
                {item.count}
              </span>
              <span className="text-gray-600 text-center">
                {item.fine || "-"}
              </span>
              <span className="text-blue-600 font-medium text-center">
                {item.rate || "-"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationsByDistrict;
