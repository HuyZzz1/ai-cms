import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import ProductDetailPage from "layouts/ecommerce/products/product-page/components/ProductDetailPage";
import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

function ProductPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Dashboard", "Giám sát Camera"]} />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Giám sát Camera
              </MDTypography>
            </MDBox>

            <ProductDetailPage />

            <MDBox mt={8} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Cảnh báo & Sự cố gần nhất
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProductPage;
