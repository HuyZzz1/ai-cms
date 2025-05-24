import React from "react";
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
];

function CameraManager() {
  return (
    <DashboardLayout>
      <DashboardNavbar breadcrumbRoute={["Quản lí", "Quản lí Camera"]} />

      <div className="flex flex-col gap-2 mt-10 bg-white p-5 rounded-xl">
        <MDTypography variant="h6" fontWeight="medium" className="pb-2">
          Bộ lọc
        </MDTypography>
        <div className="flex items-center gap-5 md:flex-col">
          {/* Tìm kiếm */}
          <MDInput label="Tìm kiếm theo tên" fullWidth />

          {/* Khu vực */}
          <FormControl size="small" fullWidth>
            <Autocomplete
              options={[
                { label: "TP. Hồ Chí Minh", value: "hcm" },
                { label: "Hà Nội", value: "hanoi" },
                { label: "Đà Nẵng", value: "danang" },
              ]}
              size="small"
              fullWidth
              clearOnEscape
              isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "44px",
                  fontSize: "14px",
                  paddingRight: "10px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="🌐 Chọn khu vực" />
              )}
            />
          </FormControl>

          <FormControl size="small" fullWidth>
            <Autocomplete
              options={[
                { label: "Tốt", value: "active" },
                { label: "Không hoạt động", value: "unActive" },
              ]}
              size="small"
              fullWidth
              clearOnEscape
              isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "44px",
                  fontSize: "14px",
                  paddingRight: "10px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="🌐 Chọn trạng thái" />
              )}
            />
          </FormControl>

          <FormControl size="small" fullWidth>
            <Autocomplete
              options={[
                { label: "Loại 1", value: "hcm" },
                { label: "Loại 2", value: "hanoi" },
                { label: "Loại 3", value: "danang" },
              ]}
              size="small"
              fullWidth
              clearOnEscape
              isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "44px",
                  fontSize: "14px",
                  paddingRight: "10px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="🌐 Chọn loại" />
              )}
            />
          </FormControl>
        </div>
      </div>

      <MDBox my={3}>
        <div className="flex items-center justify-end pb-5 ">
          <div className="flex items-center justify-center rounded-xl text-white bg-[#262626] p-2 cursor-pointer min-w-[200px]">
            <MDTypography
              variant="h6"
              fontWeight="medium"
              className="!text-white"
            >
              Thêm mới
            </MDTypography>
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md-min:grid-cols-2 lg-min:grid-cols-3 xl-min:grid-cols-4">
          {initialData.map((item, index) => (
            <div
              className="flex flex-col gap-4 bg-white rounded-xl p-3"
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
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <MDTypography
                  variant="h5"
                  fontWeight="bold"
                  className="text-center"
                >
                  {item?.title}
                </MDTypography>
                <div className="flex gap-2">
                  <SiStatuspal size={24} className="text-green-500 mt-[-3px]" />
                  <MDTypography variant="h6" fontWeight="medium">
                    Trạng thái: {item?.status}
                  </MDTypography>
                </div>
                <div className="flex gap-2">
                  <FaRegCalendarCheck size={20} className="text-blue-500" />
                  <MDTypography variant="h6" fontWeight="medium">
                    Thời gian cập nhật gần nhất: {item?.time}
                  </MDTypography>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 lg:flex-col lg:items-start">
                  <div className="flex flex-1 items-center justify-center rounded-xl text-white bg-blue-500 p-2 cursor-pointer lg:w-full">
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      className="!text-white"
                    >
                      Chỉnh sửa
                    </MDTypography>
                  </div>
                  <div className="flex flex-1 items-center justify-center rounded-xl text-white bg-yellow-500 p-2 cursor-pointer lg:w-full">
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      className="!text-white"
                    >
                      Lên lịch bảo trì
                    </MDTypography>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center rounded-xl text-white bg-red-400 p-2 cursor-pointer">
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    className="!text-white"
                  >
                    Xóa
                  </MDTypography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MDBox>
    </DashboardLayout>
  );
}

export default CameraManager;
