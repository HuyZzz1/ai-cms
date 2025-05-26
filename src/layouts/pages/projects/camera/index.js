import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { SiStatuspal } from "react-icons/si";
import { FaRegCalendarCheck } from "react-icons/fa";
import MDInput from "components/MDInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FilterToggleBox from "./components/FilterToggleBox";
import MDButton from "components/MDButton";
import { Grid, Icon, Menu } from "@mui/material";

const initialData = [
  {
    title: "CAM_0975",
    img: "https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    status: "Tốt",
    time: "3 ngày trước",
  },
  {
    title: "CAM_0976",
    status: "Tốt",
    img: "https://www.youtube.com/embed/5WN2PJ_Qxjs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "5 ngày trước",
  },
  {
    title: "CAM_0977",
    status: "Tốt",
    img: "https://www.youtube.com/embed/DLmn7f9SJ5A?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "6 ngày trước",
  },
  {
    title: "CAM_0978",
    status: "Tốt",
    img: "https://www.youtube.com/embed/RGY622xx1s4?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "2 ngày trước",
  },
  {
    title: "CAM_0979",
    status: "Tốt",
    img: "https://www.youtube.com/embed/Q71sLS8h9a4?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "1 ngày trước",
  },
  {
    title: "CAM_0980",
    status: "Tốt",
    img: "https://www.youtube.com/embed/83VPsAPWiME?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "3 ngày trước",
  },
  {
    title: "CAM_0981",
    status: "Tốt",
    img: "https://www.youtube.com/embed/RGY622xx1s4?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "3 ngày trước",
  },
  {
    title: "CAM_0981",
    status: "Tốt",
    img: "https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "1 ngày trước",
  },
  {
    title: "CAM_0982",
    status: "Tốt",
    img: "https://www.youtube.com/embed/ByED80IKdIU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1",
    time: "1 ngày trước",
  },
];

function CameraManager() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Quản lí", "Quản lí Camera"]} />
      <div
        className={`flex items-center justify-end gap-10  w-full pt-5
        }`}
      >
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex items-center gap-2"
        >
          <p className="text-[16px] font-bold">Bộ lọc</p>
          <Icon color="info" fontSize="medium">
            filter_alt
          </Icon>
        </div>

        <MDButton color="info">Thêm mới</MDButton>
      </div>
      <FilterToggleBox open={open} setOpen={setOpen} />
      <Grid container spacing={3}>
        {initialData.map((item, index) => (
          <Grid item xs={12} md={6} xl={4}>
            <div
              className="flex flex-col gap-4 bg-white rounded-xl p-3 w-full"
              style={{
                boxShadow: "0rem 0.0625rem 0.125rem 0rem rgba(0, 0, 0, 0.05)",
              }}
              key={index}
            >
              <div className="w-full">
                <iframe
                  src={item.img}
                  title="YouTube Live Stream"
                  allow="autoplay"
                  allowFullScreen
                  width="100%"
                  height={300}
                  className="rounded-xl"
                />
              </div>
              <div className="flex items-center">
                <div className="flex flex-col gap-2 flex-1">
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Trạng thái: {item?.status}
                  </MDTypography>
                  <MDTypography variant="h5" textTransform="capitalize">
                    {item?.title}
                  </MDTypography>
                </div>
                <div>
                  <>
                    <Icon
                      fontSize="default"
                      color="secondary"
                      sx={{ cursor: "pointer", fontWeight: "bold" }}
                      onClick={handleMenuOpen}
                    >
                      more_vert
                    </Icon>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left", // Gắn bên trái icon
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right", // Hiển thị lệch sang trái
                      }}
                      PaperProps={{
                        elevation: 4,
                        sx: {
                          mt: 1,
                          borderRadius: "8px",
                          minWidth: 180,
                          boxShadow:
                            "0rem 0.0625rem 0.125rem 0rem rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>Chỉnh sửa</MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        Lên lịch bảo trì
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Xóa</MenuItem>
                    </Menu>
                  </>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}

export default CameraManager;
