import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import RateOfViolations from "layouts/dashboards/analytics/components/RateOfViolations";
import ReportsBarChart from "layouts/dashboards/analytics/components/ReportsBarChart";
import ReportsLineChart from "layouts/dashboards/analytics/components/ReportsLineChart";
import TrafficOverview from "layouts/dashboards/analytics/components/TrafficOverview";
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VideocamIcon from "@mui/icons-material/Videocam";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PlaceIcon from "@mui/icons-material/Place";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FilterToggleBox from "./components/FilterToggleBox";

const Analytics = () => {
  const { sales } = reportsLineChartData;
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbRoute={["Dashboard", "Tổng quan giao thông"]}
      />
      <MDBox py={3}>
        <FilterToggleBox
          onFilter={(data) => {
            console.log("Filter:", data);
          }}
        />

        <MDBox>
          <Grid
            container
            spacing={3}
            alignItems="stretch"
            sx={{
              marginBottom: 3,
            }}
          >
            <Grid item xs={12} md={12} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <ReportsBarChart
                  color="success"
                  title="Biểu đồ thời gian thực về lưu lượng tham gia giao thông theo giờ/ngày."
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <ReportsLineChart
                  color="success"
                  title="Biểu đồ thời gian thực về số vi phạm theo giờ/ngày."
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <RateOfViolations />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3} className="h-full">
            <Grid item xs={12} md={6} lg={3} className="h-full">
              <MDBox className="h-full">
                <ComplexStatisticsCard
                  icon="weekend"
                  title="Tổng số phương tiện giám sát hôm nay"
                  count={281}
                  className="h-full"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="h-full">
              <MDBox className="h-full">
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Tổng số Vi Phạm ATGT theo ngày"
                  count="2,300"
                  className="h-full"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="h-full">
              <MDBox className="h-full">
                <ComplexStatisticsCard
                  icon="store"
                  title="Tổng số vụ TNGT theo ngày"
                  count="34k"
                  className="h-full"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="h-full">
              <MDBox className="h-full">
                <ComplexStatisticsCard
                  icon="person_add"
                  title="Số camera đang hoạt động"
                  count="+91"
                  className="h-full"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3} className="cursor-pointer">
              <MDBox
                mt={3}
                onClick={() => navigate("/dashboards/surveillance")}
              >
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
                      title="YouTube Live Stream"
                      allow="autoplay"
                      allowFullScreen={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  <Box textAlign="center" p={2}>
                    <Typography variant="h6" fontWeight="bold">
                      <LocationOnIcon fontSize="small" color="error" />
                      TP. Hồ Chí Minh
                    </Typography>

                    <p className="pt-2 font-medium text-sm">
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      120/150
                    </p>
                    <p className="pt-1 font-medium text-sm">
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 530
                    </p>
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="cursor-pointer">
              <MDBox
                mt={3}
                onClick={() => navigate("/dashboards/surveillance")}
              >
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
                      title="YouTube Live Stream"
                      allow="autoplay"
                      allowFullScreen={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  <Box textAlign="center" p={2}>
                    <Typography variant="h6" fontWeight="bold">
                      <LocationOnIcon fontSize="small" color="error" />
                      TP. Hồ Chí Minh
                    </Typography>

                    <p className="pt-2 font-medium text-sm">
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      120/150
                    </p>
                    <p className="pt-1 font-medium text-sm">
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 530
                    </p>
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="cursor-pointer">
              <MDBox
                mt={3}
                onClick={() => navigate("/dashboards/surveillance")}
              >
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/5WN2PJ_Qxjs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
                      title="YouTube Live Stream"
                      allow="autoplay"
                      allowFullScreen={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  <Box textAlign="center" p={2}>
                    <Typography variant="h6" fontWeight="bold">
                      <LocationOnIcon fontSize="small" color="error" />
                      TP. Hồ Chí Minh
                    </Typography>

                    <p className="pt-2 font-medium text-sm">
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      120/150
                    </p>
                    <p className="pt-1 font-medium text-sm">
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 530
                    </p>
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="cursor-pointer">
              <MDBox
                mt={3}
                onClick={() => navigate("/dashboards/surveillance")}
              >
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/1fiF7B6VkCk?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
                      title="YouTube Live Stream"
                      allow="autoplay"
                      allowFullScreen={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  <Box textAlign="center" p={2}>
                    <Typography variant="h6" fontWeight="bold">
                      <LocationOnIcon fontSize="small" color="error" />
                      TP. Hồ Chí Minh
                    </Typography>

                    <p className="pt-2 font-medium text-sm">
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      120/150
                    </p>
                    <p className="pt-1 font-medium text-sm">
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 530
                    </p>
                  </Box>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <TrafficOverview />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};

export default Analytics;
