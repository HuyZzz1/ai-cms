import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MDTypography from "components/MDTypography";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mockData = [
  {
    province: "TP. Hà Nội",
    lat: 21.0285,
    lng: 105.8542,
    sales: 120,
    value: "45,000",
    bounce: "12.5%",
  },
  {
    province: "TP. Hồ Chí Minh",
    lat: 10.7626,
    lng: 106.6602,
    sales: 110,
    value: "42,000",
    bounce: "14.2%",
  },
  {
    province: "Đà Nẵng",
    lat: 16.0544,
    lng: 108.2022,
    sales: 95,
    value: "37,000",
    bounce: "11.8%",
  },
  {
    province: "Cần Thơ",
    lat: 10.0452,
    lng: 105.7469,
    sales: 80,
    value: "29,000",
    bounce: "9.7%",
  },
  {
    province: "Hải Phòng",
    lat: 20.8449,
    lng: 106.6881,
    sales: 76,
    value: "27,500",
    bounce: "10.1%",
  },
];

function TrafficOverview() {
  return (
    <Card sx={{ p: 3 }}>
      <MDTypography variant="h5" fontWeight="bold">
        Heatmap mật độ lưu thông
      </MDTypography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={12} lg={5}>
          <Box sx={{ overflowX: "auto" }}>
            <Grid container sx={{ minWidth: "500px" }}>
              {/* Header */}
              <Grid item xs={4}>
                <MDTypography variant="h6" fontWeight="bold">
                  Tổng quan giao thông
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="bold">
                  Vi phạm hôm nay
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="bold">
                  Giá trị phạt
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="bold">
                  Tỉ lệ
                </MDTypography>
              </Grid>

              {/* Dữ liệu */}
              {mockData.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    xs={4}
                    mt={1}
                    sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
                  >
                    <MDTypography variant="body2">{item.province}</MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    mt={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
                  >
                    <MDTypography variant="body2">{item.sales}</MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    mt={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
                  >
                    <MDTypography variant="body2">{item.value}</MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    mt={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
                  >
                    <MDTypography variant="body2">{item.bounce}</MDTypography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} lg={7}>
          <MapContainer
            bounds={[
              [8.18, 102.14],
              [23.39, 109.46],
            ]}
            maxBounds={[
              [8.18, 102.14],
              [23.39, 109.46],
            ]}
            zoom={5.5}
            className="w-full h-[500px] rounded-lg"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution="© OpenStreetMap contributors, © CARTO"
            />

            {(() => {
              return mockData.map((item, index) => {
                return (
                  <CircleMarker
                    key={index}
                    center={[item.lat, item.lng]}
                    radius={8}
                    fillOpacity={0.7}
                    color="#1976d2"
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <span>
                        {item.province}: {item.sales} vi phạm
                      </span>
                    </Tooltip>
                  </CircleMarker>
                );
              });
            })()}
          </MapContainer>
        </Grid>
      </Grid>
    </Card>
  );
}

export default TrafficOverview;
