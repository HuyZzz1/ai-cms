import { useState } from "react";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";

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

function FilterToggleBox({ onFilter }) {
  const [open, setOpen] = useState(false);
  const [province, setProvince] = useState("");
  const [range, setRange] = useState("1M");

  const handleApply = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setOpen(false);
  };

  return (
    <MDBox className="mb-5">
      <div
        className={`flex items-center gap-2 justify-end  w-full h-full ${
          open ? "mb-5" : ""
        } `}
      >
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex items-center gap-2 "
        >
          <p className="text-[16px] font-bold">Bộ lọc</p>
          <Icon color="info" fontSize="medium">
            filter_alt
          </Icon>
        </div>
      </div>

      <Collapse in={open}>
        <div className="bg-white p-5 rounded-lg flex flex-col gap-2.5">
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

          <div className="flex items-center justify-end gap-5">
            <MDButton color="info" onClick={handleApply}>
              Áp dụng
            </MDButton>
            <MDButton
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Đặt lại
            </MDButton>
          </div>
        </div>
      </Collapse>
    </MDBox>
  );
}

export default FilterToggleBox;
