import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import MDBox from "components/MDBox";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import MDTypography from "components/MDTypography";

const mockProvinces = [
  "TP. Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Bình Dương",
  "Bắc Ninh",
  "Vĩnh Phúc",
  "Thừa Thiên Huế",
  "Nghệ An",
  "Lâm Đồng",
];

function FilterToggleBox({ open }) {
  const [province, setProvince] = useState("");
  const [range, setRange] = useState("1M");

  return (
    <MDBox>
      <Collapse
        in={open}
        className="border border-gray-200 px-5 py-2  rounded-lg mb-5"
      >
        <MDTypography variant="h6" className="pb-2">
          Bộ lọc
        </MDTypography>
        <div className="rounded-lg flex flex-col gap-2.5">
          <MDBox display="flex" mb={2}>
            <ToggleButtonGroup
              value={range}
              exclusive
              onChange={(e, newVal) => newVal && setRange(newVal)}
              size="small"
              sx={{
                borderRadius: "6px",
                border: "1px solid #dcdcdc",
                "& .MuiToggleButtonGroup-grouped": {
                  minWidth: 60, // ✅ nhỏ hơn
                  px: 1.5, // ✅ padding trái/phải nhỏ hơn
                  py: 0.8, // ✅ thêm padding trên/dưới cho cân đối
                  fontWeight: 700,
                  fontSize: "0.75rem", // ✅ chữ nhỏ hơn một chút
                  border: "none",
                  "&.Mui-selected": {
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                    borderRadius: "4px", // ✅ bo tròn nhỏ lại
                  },
                },
              }}
            >
              <ToggleButton value="7D">7D</ToggleButton>
              <ToggleButton value="1M">1M</ToggleButton>
              <ToggleButton value="3M">3M</ToggleButton>
            </ToggleButtonGroup>
          </MDBox>
          <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
            <Autocomplete
              size="small"
              className="w-full"
              options={mockProvinces}
              value={province}
              onChange={(e, newValue) => setProvince(newValue || "")}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Tỉnh / Thành phố"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined" // ✅ hiển thị border rõ ràng
                />
              )}
            />
          </MDBox>
        </div>
      </Collapse>
    </MDBox>
  );
}

export default FilterToggleBox;
