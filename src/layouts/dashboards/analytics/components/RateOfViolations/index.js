// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Chart.js Pie imports
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Đăng ký plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Dữ liệu biểu đồ (có thể nhận từ props)
const pieData = {
  labels: ["USA", "Germany"],
  datasets: [
    {
      label: "Violation Types",
      data: [400, 300],
      backgroundColor: ["#2196f3", "#26a69a"],
      borderWidth: 1,
    },
  ],
};

// Tùy chọn hiển thị nhãn trên biểu đồ
const options = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
        },
      },
    },
    datalabels: {
      color: "#fff",
      font: {
        weight: "bold",
        size: 14,
      },
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
    <Card sx={{ width: "100%", height: "100%" }}>
      <MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Tỷ lệ các loại vi phạm
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox
          sx={{
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pie data={pieData} options={options} />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default RateOfViolations;
