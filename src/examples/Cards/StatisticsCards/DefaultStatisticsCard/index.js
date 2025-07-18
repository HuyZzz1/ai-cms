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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 3 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 3 PRO React contexts
import { useMaterialUIController } from "context";

function DefaultStatisticsCard({
  title,
  count,
  percentage = {
    color: "success",
    value: "",
    label: "",
  },
  dropdown = false,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card className="h-full">
      <MDBox p={2} className="h-full">
        <MDBox mb={0.5} lineHeight={1}>
          <MDTypography
            variant="button"
            fontWeight="medium"
            color="text"
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
        </MDBox>
        <MDBox lineHeight={1}>
          <MDTypography variant="h5" fontWeight="bold">
            {count}
          </MDTypography>
          <MDTypography
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.value}&nbsp;
            <MDTypography
              variant="button"
              fontWeight="regular"
              color={darkMode ? "text" : "secondary"}
            >
              {percentage.label}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
};

export default DefaultStatisticsCard;
