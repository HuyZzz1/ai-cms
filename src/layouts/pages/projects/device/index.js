import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "./dataTableData";
import MDTypography from "components/MDTypography";

const Device = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Quản lí", "Quản Lí Thiết Bị"]} />
      <MDBox my={3}>
        <MDBox mb={1} ml={2}>
          <MDTypography variant="h5" fontWeight="medium">
            Quản Lí Thiết Bị
          </MDTypography>
        </MDBox>
        <DataTable
          table={dataTableData}
          entriesPerPage={{ defaultValue: 8, entries: [5, 10, 15] }}
          showTotalEntries={true}
          isSorted={true}
          pagination={{ variant: "gradient", color: "info" }}
        />
      </MDBox>
    </DashboardLayout>
  );
};

export default Device;
