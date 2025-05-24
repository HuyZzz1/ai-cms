import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";

import MDTypography from "components/MDTypography";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Dữ liệu Top 10 lỗi vi phạm giao thông
const pieData = {
  labels: [
    "Không đội mũ bảo hiểm",
    "Vượt đèn đỏ",
    "Đi sai làn đường",
    "Không có giấy tờ xe",
    "Không thắt dây an toàn",
    "Chở quá số người quy định",
    "Đi ngược chiều",
    "Gọi điện khi lái xe",
    "Uống rượu bia khi lái xe",
    "Chạy quá tốc độ",
  ],
  datasets: [
    {
      label: "Lỗi vi phạm",
      data: [200, 180, 150, 120, 100, 90, 85, 80, 75, 70],
      backgroundColor: [
        "#e53935",
        "#fb8c00",
        "#fdd835",
        "#43a047",
        "#1e88e5",
        "#8e24aa",
        "#6d4c41",
        "#00acc1",
        "#c2185b",
        "#3949ab",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  cutout: "50%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `Vi phạm: ${percentage}%`;
        },
      },
    },
    datalabels: {
      display: true,
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
    <Card className="h-full">
      <MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Tỷ lệ Top 10 lỗi vi phạm giao thông
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={2} alignItems="center">
          {/* Cột bên trái: Chart */}
          <Grid item xs={12}>
            <MDBox
              sx={{
                height: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Doughnut data={pieData} options={options} />
            </MDBox>
          </Grid>

          {/* Cột bên phải: Custom legend dọc */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {pieData.labels.map((label, index) => (
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
                  <p className="text-sm font-medium">{label}</p>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default RateOfViolations;
