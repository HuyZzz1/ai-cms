import { useState } from "react";
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
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FilterToggleBox from "./FilterToggleBox";
import ReusableLineChart from "./ReusableLineChart";

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

function ViolationOverviewChart() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="h-full">
      <MDBox py={2} pr={2} pl={2}>
        <div className="pt-2.5 flex items-center justify-end">
          <div className="flex-1">
            <MDTypography variant="h6">
              Phân tích Vi Phạm theo Thời gian
            </MDTypography>
          </div>
          <div
            className={`flex items-center gap-2 justify-end ${
              open ? "mb-5" : ""
            }`}
          >
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer flex items-center gap-2"
            >
              <Icon color="info" fontSize="medium">
                filter_alt
              </Icon>
            </div>
          </div>
        </div>

        <FilterToggleBox open={open} setOpen={setOpen} />
      </MDBox>

      <ReusableLineChart
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        datasets={[
          { label: "Vi phạm tín hiệu", data: [3, 50, 60, 80, 22, 16] },
          { label: "Vi phạm tốc độ", data: [5, 30, 50, 100, 60, 80] },
        ]}
        chartColors={["--chart-1", "--chart-2"]}
      />
    </Card>
  );
}

export default ViolationOverviewChart;
