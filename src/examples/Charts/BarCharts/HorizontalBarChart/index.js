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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chart = {
  labels: Array.from({ length: 24 }, (_, i) => i.toString()),
  datasets: [
    {
      label: "Số lượt vi phạm",
      data: [
        120, 110, 115, 100, 105, 130, 500, 600, 550, 200, 180, 190, 160, 170,
        180, 220, 700, 650, 620, 300, 280, 290, 310, 320,
      ],
      color: "error",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
    title: {
      display: true,
      text: "Tổng Số Vi Phạm Theo Giờ Trong Tuần",
      font: {
        size: 16,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Giờ trong ngày",
      },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: "Tổng số vi phạm",
      },
      beginAtZero: true,
    },
  },
};

function HorizontalBarChart({
  icon = { color: "info", component: "" },
  title = "",
  description = "",
  height = "19.125rem",
}) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: `rgba(244, 67, 54, ${
          0.3 + dataset.data.map((v) => v / 700).map((n) => Math.min(n, 1))
        })`,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const data = {
    labels: chart.labels,
    datasets: chartDatasets,
  };

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "dark"}
              variant="gradient"
              coloredShadow={icon.color || "dark"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(
        () => (
          <MDBox height={height}>
            <Bar data={data} options={options} redraw />
          </MDBox>
        ),
        [height]
      )}
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

HorizontalBarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HorizontalBarChart;
