import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MDTypography from "components/MDTypography";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DataTable from "examples/Tables/DataTable";

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
  {
    province: "Bình Dương",
    lat: 11.3254,
    lng: 106.477,
    sales: 70,
    value: "25,000",
    bounce: "13.3%",
  },
  {
    province: "Bắc Ninh",
    lat: 21.186,
    lng: 106.0763,
    sales: 65,
    value: "22,000",
    bounce: "10.8%",
  },
  {
    province: "Thừa Thiên Huế",
    lat: 16.4637,
    lng: 107.5909,
    sales: 50,
    value: "17,000",
    bounce: "8.9%",
  },
  {
    province: "Nghệ An",
    lat: 19.2342,
    lng: 104.92,
    sales: 45,
    value: "15,500",
    bounce: "11.2%",
  },
  {
    province: "Lâm Đồng",
    lat: 11.9416,
    lng: 108.4383,
    sales: 40,
    value: "13,600",
    bounce: "7.6%",
  },
];

const columns = [
  {
    Header: "Tổng quan giao thông",
    accessor: "province",
    Cell: ({ value }) => (
      <MDTypography variant="medium" fontWeight="medium">
        {value}
      </MDTypography>
    ),
  },
  {
    Header: "Vi phạm hôm nay",
    accessor: "sales",
    Cell: ({ value }) => (
      <MDTypography variant="medium" color="text">
        {value}
      </MDTypography>
    ),
    align: "center",
  },
  {
    Header: "Giá trị phạt",
    accessor: "value",
    Cell: ({ value }) => (
      <MDTypography variant="medium" color="text">
        {value}
      </MDTypography>
    ),
    align: "center",
  },
  {
    Header: "Tỉ lệ",
    accessor: "bounce",
    Cell: ({ value }) => (
      <MDTypography variant="medium" color="text">
        {value}
      </MDTypography>
    ),
    align: "center",
  },
];

const rows = mockData.map((item) => ({
  province: item.province,
  sales: item.sales,
  value: item.value,
  bounce: item.bounce,
}));

function TrafficOverview() {
  return (
    <Card sx={{ p: 3 }}>
      <MDTypography variant="h6" fontWeight="bold">
        Heatmap mật độ lưu thông
      </MDTypography>

      <Grid container spacing={3} className="pt-5">
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ overflowX: "auto" }}>
            <Box pb={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
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
            className="w-full h-[600px] rounded-lg"
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
