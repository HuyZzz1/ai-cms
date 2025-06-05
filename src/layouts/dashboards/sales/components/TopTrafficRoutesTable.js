import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TopTrafficRoutesTable({ data }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>TUYẾN ĐƯỜNG</TableHead>
            <TableHead>SỐ LƯỢT</TableHead>
            <TableHead>CẢNH BÁO</TableHead>
            <TableHead>MỨC ĐỘ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="py-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                    />
                    <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500">
                      {product.category}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 text-sm font-medium">
                {product.value}
              </TableCell>
              <TableCell className="py-4 text-sm">{product.sales}</TableCell>
              <TableCell className="py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{product.percentage}</span>
                  <span
                    className={`text-xs ${
                      product.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.trend === "up" ? "↗" : "↘"}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
