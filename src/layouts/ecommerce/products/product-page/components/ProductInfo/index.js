import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ProductInfo({ video }) {
  return (
    <MDBox className="md:mt-[-50px]">
      <MDTypography variant="h4" fontWeight="bold">
        ID Camera: {video.cameraId}
      </MDTypography>
      <div className="flex flex-col gap-1 pt-5">
        <MDTypography variant="h6">Vị trí: {video.address}</MDTypography>
        <MDTypography variant="h6">
          Trạng thái kết nối:{" "}
          <span className="text-green-500"> {video.status}</span>
        </MDTypography>
        <MDTypography variant="h6">
          Thời gian hoạt động gần nhất: {video.time}
        </MDTypography>

        <MDBox>
          <MDTypography variant="h6">Tính năng hỗ trợ:</MDTypography>
          <MDTypography variant="body2" className="font-medium">
            {video.description.map((line, i) => (
              <div key={i}>• {line}</div>
            ))}
          </MDTypography>
        </MDBox>
      </div>
    </MDBox>
  );
}

export default ProductInfo;
