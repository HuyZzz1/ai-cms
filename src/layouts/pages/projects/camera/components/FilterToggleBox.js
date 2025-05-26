import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { Grid } from "@mui/material";
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

function FilterToggleBox({ open, setOpen }) {
  const [province, setProvince] = useState("");

  const handleApply = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setOpen(false);
  };

  return (
    <MDBox className="my-5">
      <Collapse in={open}>
        <div className="bg-white p-5 rounded-lg flex flex-col gap-2.5">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
                <FormField
                  size="small"
                  label="Ghi chú"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  className="w-full"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 35, // hoặc thấp hơn: 36
                    },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
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
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
                <Autocomplete
                  size="small"
                  className="w-full"
                  options={[]}
                  value={province}
                  onChange={(e, newValue) => setProvince(newValue || "")}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="Loại"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  )}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox display="flex" gap={2} flexWrap="wrap" mb={2}>
                <Autocomplete
                  size="small"
                  className="w-full"
                  options={[]}
                  value={province}
                  onChange={(e, newValue) => setProvince(newValue || "")}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="Trạng thái"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  )}
                />
              </MDBox>
            </Grid>
          </Grid>

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
