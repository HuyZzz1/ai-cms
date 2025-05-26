import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
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

function getHSLColor(variable) {
  if (typeof window === "undefined") return "0 0% 0%";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

export default function ReusableLineChart({
  labels,
  datasets,
  chartColors = ["--chart-1", "--chart-2"],
  height = 350,
}) {
  const chartData = useMemo(() => {
    if (typeof window === "undefined") return { labels, datasets: [] };

    return {
      labels,
      datasets: datasets.map((ds, index) => {
        const hsl = getHSLColor(chartColors[index % chartColors.length]);
        const base = tinycolor(`hsl(${hsl})`);

        const borderColor =
          index === 0 ? base.toRgbString() : base.setAlpha(0.6).toRgbString();

        const gradientTop = base.toRgbString(); // đậm
        const gradientBottom = base.setAlpha(0.3).toRgbString(); // nhạt

        return {
          ...ds,
          tension: 0.4,
          pointRadius: 2,
          borderWidth: 1.5,
          fill: true,
          borderColor,
          pointBackgroundColor: borderColor,
          backgroundColor: function (context) {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return gradientBottom;

            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, gradientTop);
            gradient.addColorStop(1, gradientBottom);
            return gradient;
          },
        };
      }),
    };
  }, [labels, datasets, chartColors]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#e0e0e0", // ✅ màu xám nhẹ như ảnh
          lineWidth: 1, // ✅ mỏng nhẹ
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: "#666", // màu số dọc
          padding: 8,
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

ReusableLineChart.propTypes = {
  labels: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  chartColors: PropTypes.array,
  height: PropTypes.number,
};
