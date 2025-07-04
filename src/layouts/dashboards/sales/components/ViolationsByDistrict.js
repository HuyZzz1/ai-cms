import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getViolationsByDistrictQuery } from "@/service/api/dashboard";
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
        <CardTitle className="text-lg font-semibold">
          Vi phạm theo quận huyện
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <span>Quận/Huyện</span>
            <span className="text-center">Vi phạm</span>
          </div>

          {data?.length === 0 && (
            <div className="text-center  text-gray-500 italic py-4">
              Chưa có dữ liệu
            </div>
          )}

          {data?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 text-sm py-2 border-b border-gray-100"
            >
              <span className="font-medium ">{item.districtName}</span>
              <span className=" font-medium text-center ">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationsByDistrict;
