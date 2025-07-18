/**
=========================================================
* Material Dashboard 3 PRO React - v2.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";

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

function ReportsLineChart({
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
              <Line data={data} options={options} redraw />
            </MDBox>
          ),
          [chart, color]
        )}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
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

export default ReportsLineChart;
