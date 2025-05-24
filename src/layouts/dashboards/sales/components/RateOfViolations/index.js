import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";

import MDTypography from "components/MDTypography";
import { Doughnut } from "react-chartjs-2";

const rawLabels = [
  "Tốc độ vượt quy định",
  "Vượt đèn đỏ",
  "Đi sai làn đường",
  "Dừng/đỗ sai quy định",
  "Khác",
];

const rawData = [400, 200, 150, 100, 50];
const rawColors = ["#6CE4E8", "#42B8D5", "#2D8CBA", "#506E9A", "#635A92"];

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
  cutout: "50%",
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
    <Card className="h-full">
      <MDBox className="pt-2.5">
        <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
          Tỉ lệ Loại Vi Phạm
        </MDTypography>
      </MDBox>

      <div className="flex flex-col gap-5 justify-center p-5 flex-1">
        <MDBox className="flex items-center justify-center h-[250px] w-full">
          <Doughnut data={pieData} options={options} className="w-full" />
        </MDBox>

        <Box display="flex" flexDirection="column" gap={1}>
          {pieData.labels.map((label, index) => {
            const value = pieData.datasets[0].data[index];
            const total = pieData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);

            return (
              <Box key={index} display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    backgroundColor: pieData.datasets[0].backgroundColor[index],
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
      </div>
    </Card>
  );
}

export default RateOfViolations;
