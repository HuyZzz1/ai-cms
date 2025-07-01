import { useForm, Controller } from "react-hook-form";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "service/message";
import { message } from "@/components/ui/message";
import { registerTenantsQuery } from "@/service/api/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regionsRecoil } from "@/service/recoil/regions";
import { useRecoilValue } from "recoil";

function Basic() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      regionId: "",
    },
  });
  const navigate = useNavigate();
  const regionList = useRecoilValue(regionsRecoil);

  const { mutate, isPending } = useMutation({
    mutationFn: registerTenantsQuery,
    onSuccess: () => {
      message.success("Tạo tài khoản thành công");
      navigate("/authentication/sign-in");
    },
    onError: (err) => {
      message.error(ErrorMessage[err.message] || err.message);
    },
  });

  const onSubmit = (values) => {
    mutate({ ...values, plan: "pro" });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={2}
          mt={2}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Đăng kí
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBox mb={2}>
              <Controller
                name="regionId"
                control={control}
                rules={{
                  required: "Vui lòng chọn khu vực",
                }}
                render={({ field }) => (
                  <>
                    <label className="block mb-1 text-sm text-[#737373]">
                      Khu vực
                    </label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-[44px]">
                        <SelectValue placeholder="Chọn khu vực" />
                      </SelectTrigger>
                      <SelectContent>
                        {regionList?.map((region) => (
                          <SelectItem key={region._id} value={region._id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
              {errors.regionId && (
                <span className="text-sm text-red-600 mt-1 block">
                  {errors.regionId.message}
                </span>
              )}
            </MDBox>
            <MDBox mb={2}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Vui lòng nhập tên",
                  pattern: {
                    message: "Vui lòng nhập tên",
                  },
                }}
                render={({ field }) => (
                  <MDInput
                    {...field}
                    label="Tên"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{
                      "& .MuiFormHelperText-root": {
                        color: "error.main",
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </MDBox>
            <MDBox mb={2}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                }}
                render={({ field }) => (
                  <MDInput
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      "& .MuiFormHelperText-root": {
                        color: "error.main",
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </MDBox>

            <MDBox mb={2}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Vui lòng nhập mật khẩu",
                }}
                render={({ field }) => (
                  <MDInput
                    {...field}
                    type="password"
                    label="Mật khẩu"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{
                      "& .MuiFormHelperText-root": {
                        color: "error.main",
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="submit"
                disabled={isPending}
              >
                Đăng kí
              </MDButton>
            </MDBox>
          </form>
          <div className="flex items-center justify-center pt-2.5">
            <p className="text-sm">
              Đã có tài khoản?{" "}
              <span
                className="underline font-semibold cursor-pointer"
                onClick={() => navigate("/authentication/sign-in")}
              >
                {" "}
                Đăng nhập
              </span>
            </p>
          </div>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
