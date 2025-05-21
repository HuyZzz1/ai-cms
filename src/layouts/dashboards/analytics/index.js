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

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 3 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
import RateOfViolations from "layouts/dashboards/analytics/components/RateOfViolations";
import ReportsBarChart from "layouts/dashboards/analytics/components/ReportsBarChart";
import ReportsLineChart from "layouts/dashboards/analytics/components/ReportsLineChart";
import TrafficOverview from "layouts/dashboards/analytics/components/TrafficOverview";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

// @mui material components
import Divider from "@mui/material/Divider";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import VideocamIcon from "@mui/icons-material/Videocam";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PlaceIcon from "@mui/icons-material/Place";
import MDButton from "components/MDButton";

import { Box, Typography } from "@mui/material";

const Analytics = () => {
  const [selectedTime, setSelectedTime] = useState("Ngày");
  const { sales, tasks } = reportsLineChartData;

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography
          variant="body1"
          color="info"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar
        breadcrumbTitle="Tổng quan giao thông"
        breadcrumbRoute={["dashboards", "analytics"]}
      />
      <MDBox pb={3}>
        <MDBox mb={5} ml={1}>
          <MDTypography variant="h4" fontWeight="bold">
            Tổng quan giao thông
          </MDTypography>
          <MDBox
            mt={2}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="end"
            gap={4}
          >
            {/* Bộ lọc thời gian */}
            <div className="flex items-center border border-gray-400 rounded-[12px] h-[32px] overflow-hidden">
              {["Ngày", "Tuần", "Tháng"].map((label, index, arr) => (
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

            {/* Dropdown chọn khu vực */}
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

        <MDBox>
          <Grid
            container
            spacing={3}
            alignItems="stretch"
            sx={{
              marginBottom: 3,
            }}
          >
            <Grid item xs={12} md={6} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <ReportsBarChart
                  color="success"
                  title="Biểu đồ thời gian thực về lưu lượng tham gia giao thông theo giờ/ngày."
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <ReportsLineChart
                  color="success"
                  title="Biểu đồ thời gian thực về số vi phạm theo giờ/ngày."
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox sx={{ height: "100%", minHeight: 300 }}>
                <RateOfViolations />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="weekend"
                  title="Tổng số phương tiện giám sát hôm nay"
                  count={281}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Tổng số Vi Phạm ATGT theo ngày"
                  count="2,300"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="store"
                  title="Tổng số vụ TNGT theo ngày"
                  count="34k"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="person_add"
                  title="Số camera đang hoạt động"
                  count="+91"
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mt={3}>
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
                      TP. Hà Nội
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pt-2"
                    >
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      120/150
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pb-5"
                    >
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 530
                    </Typography>

                    <MDButton variant="gradient" color="info">
                      <Typography variant="button" fontWeight="medium">
                        Xem chi tiết
                      </Typography>
                    </MDButton>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    pb={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Đường Bà Triệu
                    </Typography>
                    <PlaceIcon fontSize="small" />
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mt={3}>
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%", // tỷ lệ 16:9
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/MMmXs8A1SOk?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
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

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pt-2"
                    >
                      <VideocamIcon fontSize="small" /> Camera hoạt động:
                      150/150
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pb-5"
                    >
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 1000
                    </Typography>

                    <MDButton variant="gradient" color="info">
                      <Typography variant="button" fontWeight="medium">
                        Xem chi tiết
                      </Typography>
                    </MDButton>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    pb={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Đường Lũy Bán Bích
                    </Typography>
                    <PlaceIcon fontSize="small" />
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mt={3}>
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%", // tỷ lệ 16:9
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
                      TP. Đà Nẵng
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pt-2"
                    >
                      <VideocamIcon fontSize="small" /> Camera hoạt động: 50/150
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pb-5"
                    >
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 30
                    </Typography>

                    <MDButton variant="gradient" color="info">
                      <Typography variant="button" fontWeight="medium">
                        Xem chi tiết
                      </Typography>
                    </MDButton>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    pb={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Đường Lũy Bán Bích
                    </Typography>
                    <PlaceIcon fontSize="small" />
                  </Box>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mt={3}>
                <Card sx=".card-header">
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%", // tỷ lệ 16:9
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
                      TP. Đà Nẵng
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pt-2"
                    >
                      <VideocamIcon fontSize="small" /> Camera hoạt động: 50/150
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="pb-5"
                    >
                      <WarningAmberIcon fontSize="small" color="warning" /> Vi
                      phạm hôm nay: 30
                    </Typography>

                    <MDButton variant="gradient" color="info">
                      <Typography variant="button" fontWeight="medium">
                        Xem chi tiết
                      </Typography>
                    </MDButton>
                  </Box>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                    pb={1}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Đường Lũy Bán Bích
                    </Typography>
                    <PlaceIcon fontSize="small" />
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
