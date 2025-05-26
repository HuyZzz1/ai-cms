import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DataTable from "examples/Tables/DataTable";
import RateOfViolations from "layouts/dashboards/sales/components/RateOfViolations";
import LineChart from "layouts/dashboards/sales/components/LineChart";
import BarChart from "layouts/dashboards/sales/components/BarChart";
import dataTableData from "layouts/dashboards/sales/data/dataTableData";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function Sales() {
  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Dashboard", "Tổng quan vi phạm"]} />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                color="success"
                title="Tổng vi phạm hôm nay"
                count="400"
                percentage={{
                  value: (
                    <>
                      <ArrowUpwardIcon
                        fontSize="small"
                        style={{ verticalAlign: "middle", marginRight: 4 }}
                      />
                      12%
                    </>
                  ),
                  label: "(so với ngày hôm qua)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="Số vi phạm đã xử lí"
                count="3.200"
                percentage={{
                  value: "%10",
                  label: "(AI xử lí)",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="Số vi phạm chưa xử lí"
                count="35.200"
                percentage={{
                  value: "%50",
                  label: "(AI xử lí)",
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <LineChart title=" Phân tích Vi Phạm theo Thời gian" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <RateOfViolations />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <BarChart />
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Thống kê vi phạm
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Sales;
