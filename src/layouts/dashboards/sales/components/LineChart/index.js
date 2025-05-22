import { useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadgeDot from "components/MDBadgeDot";
import configs from "examples/Charts/LineCharts/DefaultLineChart/configs";
import colors from "assets/theme/base/colors";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ViolationOverviewChart({
  title = "",
  chart = {
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    datasets: [
      {
        label: "Vi phạm tốc độ",
        data: [
          5, 3, 4, 6, 8, 10, 12, 15, 18, 20, 25, 30, 28, 22, 18, 16, 14, 12, 10,
          9, 7, 6, 5, 4,
        ],
        color: "info",
      },
      {
        label: "Vi phạm tín hiệu",
        data: [
          2, 1, 2, 3, 4, 6, 8, 10, 12, 13, 15, 18, 20, 17, 16, 14, 12, 11, 9, 7,
          6, 5, 4, 3,
        ],
        color: "warning",
      },
    ],
  },
  height = "350px",
}) {
  const [selectedTime, setSelectedTime] = useState("Hôm nay");

  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => {
        const colorObj = colors[dataset.color] || colors.dark;
        return {
          ...dataset,
          tension: 0.4,
          pointRadius: 3,
          borderWidth: 3,
          fill: true,
          backgroundColor: colorObj.main + "33",
          pointBackgroundColor: colorObj.main,
          borderColor: colorObj.main,
          maxBarThickness: 6,
        };
      })
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <MDBox py={2} pr={2} pl={2}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <MDTypography variant="h6">{title}</MDTypography>

        <MDBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="flex-end"
          gap={2}
          rowGap={4}
          width="100%"
        >
          {/* Time filter group */}
          <div className="flex items-center border border-gray-400 rounded-[12px] h-[32px] overflow-hidden w-fit xs:mb-5">
            {["Hôm nay", "7 ngày qua", "30 ngày"].map((label, index, arr) => (
              <div
                key={label}
                onClick={() => setSelectedTime(label)}
                className={`h-full px-5 flex items-center justify-center cursor-pointer text-sm ${
                  label === selectedTime
                    ? "bg-[#262626] text-white"
                    : "text-black"
                } ${
                  index !== arr.length - 1 ? "border-r border-r-gray-400" : ""
                }`}
              >
                <p>{label}</p>
              </div>
            ))}
          </div>

          {/* Region dropdown */}
          <FormControl
            size="medium"
            sx={{
              minWidth: 220,
              backgroundColor: "#fff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                paddingLeft: 1,
                height: "32px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                top: "-5px",
              },
            }}
          >
            <InputLabel id="region-select-label">🌐 Chọn khu vực</InputLabel>
            <Select
              labelId="region-select-label"
              label="🌐 Chọn khu vực"
              defaultValue="hcm"
            >
              <MenuItem value="hcm">TP. Hồ Chí Minh</MenuItem>
              <MenuItem value="hanoi">Hà Nội</MenuItem>
              <MenuItem value="danang">Đà Nẵng</MenuItem>
            </Select>
          </FormControl>
        </MDBox>
      </MDBox>

      <MDBox display="flex" alignItems="center" mb={1} flexWrap="wrap" gap={2}>
        <MDBadgeDot color="info" size="sm" badgeContent="Vi phạm tốc độ" />
        <MDBadgeDot color="warning" size="sm" badgeContent="Vi phạm tín hiệu" />
      </MDBox>

      {useMemo(
        () => (
          <MDBox height={height}>
            <Line data={data} options={options} redraw />
          </MDBox>
        ),
        [chart, height]
      )}
    </MDBox>
  );

  return <Card>{renderChart}</Card>;
}

ViolationOverviewChart.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.objectOf(PropTypes.array),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViolationOverviewChart;
