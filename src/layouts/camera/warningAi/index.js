import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";

const WarningAi = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Giám sát", "Cảnh cáo AI"]} />
    </DashboardLayout>
  );
};

export default WarningAi;
