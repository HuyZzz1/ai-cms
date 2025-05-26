import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
ChartJS.unregister(ChartDataLabels);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ReportsBarChart({
  color = "info",
  title,
  description = "",
  date,
  chart,
}) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card className="h-full">
      <MDBox p={2}>
        <MDTypography variant="h6" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography
          component="div"
          variant="button"
          color="text"
          fontWeight="light"
        >
          {description}
        </MDTypography>
      </MDBox>
      <MDBox pl={2} pb={2} pr={3}>
        {useMemo(
          () => (
            <MDBox borderRadius="lg" height="200px">
              <Bar data={data} options={options} redraw />
            </MDBox>
          ),
          [color, chart]
        )}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  ).isRequired,
};

export default ReportsBarChart;
