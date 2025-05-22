import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import LinearProgress from "@mui/material/LinearProgress";

const columns = [
  {
    Header: "vị trí",
    accessor: "location",
    Cell: ({ value }) => (
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="button" fontWeight="medium">
          {value.name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {value.cameraCount.toLocaleString()} camera{" "}
          <Icon fontSize="small" sx={{ color: "#f44336", ml: 0.5 }}>
            place
          </Icon>
        </MDTypography>
      </MDBox>
    ),
  },
  {
    Header: "số vi phạm",
    accessor: "violations",
  },
  {
    Header: "camera ID",
    accessor: "camera",
    Cell: ({ value }) => (
      <MDTypography variant="caption" title={value.tooltip} color="text">
        {value.id}
      </MDTypography>
    ),
  },
  {
    Header: "tỷ lệ xử lý",
    accessor: "processing",
    Cell: ({ value }) => (
      <MDBox width="100px">
        <MDTypography
          variant="caption"
          color="text"
          display="flex"
          alignItems="center"
          gap={1}
          mb={0.5}
        >
          {value}%
        </MDTypography>
        <MDBox width="100%">
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height: 6,
              borderRadius: 4,
              [`& .MuiLinearProgress-bar`]: {
                backgroundColor:
                  value > 80 ? "#4caf50" : value >= 60 ? "#ff9800" : "#f44336",
              },
            }}
          />
        </MDBox>
      </MDBox>
    ),
  },
  {
    Header: "",
    accessor: "mapAction",
    width: "30px",
    Cell: () => (
      <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "48px", // đảm bảo icon không bị đè
        }}
      >
        <Icon
          fontSize="small"
          color="info"
          sx={{ cursor: "pointer" }}
          titleAccess="Xem bản đồ"
        >
          info
        </Icon>
      </MDBox>
    ),
  },
];

const rows = [
  {
    location: { name: "QL1A_TP HCM, Quận 2", cameraCount: 8232 },
    violations: 221,
    camera: { id: "CAM_0975", tooltip: "Camera cố định, trạng thái OK" },
    processing: 78,
  },
  {
    location: { name: "Ngã Tư Nguyễn Văn Huyên, Hà Nội", cameraCount: 12821 },
    violations: 185,
    camera: { id: "CAM_0975", tooltip: "Camera AI nhận diện khuôn mặt" },
    processing: 62,
  },
  {
    location: { name: "Phạm Văn Đồng, Thủ Đức", cameraCount: 2421 },
    violations: 143,
    camera: { id: "CAM_0975", tooltip: "Camera lắp đặt trên cột đèn" },
    processing: 68,
  },
  {
    location: { name: "Cầu Chương Dương, Hà Nội", cameraCount: 5921 },
    violations: 138,
    camera: { id: "CAM_0975", tooltip: "Camera gắn cố định trên cầu" },
    processing: 78,
  },
  {
    location: { name: "Ngã ba Huế - Đà Nẵng", cameraCount: 921 },
    violations: 119,
    camera: { id: "CAM_0975", tooltip: "Camera quay 360 độ" },
    processing: 82,
  },
];

export default { columns, rows };
