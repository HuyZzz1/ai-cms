import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";

import MDTypography from "components/MDTypography";
import { Doughnut } from "react-chartjs-2";

const rawLabels = [
  "Không đội mũ bảo hiểm",
  "Vượt đèn đỏ",
  "Đi sai làn đường",
  "Không có giấy tờ xe",
  "Không thắt dây an toàn",
  "Chở quá số người quy định",
];

const rawData = [200, 180, 150, 0, 100, 0]; // ⛔️ có giá trị bằng 0
const rawColors = [
  "#e53935",
  "#fb8c00",
  "#fdd835",
  "#43a047",
  "#1e88e5",
  "#8e24aa",
];

// 🔍 Lọc chỉ giữ mục có giá trị > 0
const filtered = rawData
  .map((value, index) => ({
    label: rawLabels[index],
    value,
    color: rawColors[index],
  }))
  .filter((item) => item.value > 0);

// ✅ Tách lại thành mảng cho chart
const pieData = {
  labels: filtered.map((item) => item.label),
  datasets: [
    {
      label: "Lỗi vi phạm",
      data: filtered.map((item) => item.value),
      backgroundColor: filtered.map((item) => item.color),
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: "60%",
  plugins: {
    legend: {
      display: false, // ✅ dùng đúng cấu trúc
    },
    datalabels: {
      display: true, // ✅ bắt buộc nếu đang bị override
      color: "#000",
      font: {
        weight: "bold",
        size: 14,
      },
      anchor: "center",
      align: "center",
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0
        );
        const percentage = ((value / total) * 100).toFixed(1);
        return `${percentage}%`;
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

function RateOfViolations() {
  return (
    <Card>
      <MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Tỉ lệ Loại Vi Phạm
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <MDBox
              sx={{
                height: 290,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Doughnut data={pieData} options={options} />
            </MDBox>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={1}>
              {pieData.labels.map((label, index) => {
                const value = pieData.datasets[0].data[index];
                const total = pieData.datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);

                return (
                  <Box key={index} display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        backgroundColor:
                          pieData.datasets[0].backgroundColor[index],
                        borderRadius: "4px",
                        mr: 1,
                      }}
                    />
                    <p className="text-sm font-medium">
                      {label} – {percentage}%
                    </p>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default RateOfViolations;
