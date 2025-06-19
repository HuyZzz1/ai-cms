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
import { loginQuery } from "service/api/auth";
import { setCookie } from "service/cookies";
import { CookieKey } from "service/cookies";
import { showErrorToast } from "components/Toast";
import { ErrorMessage } from "service/message";
import { useSetRecoilState } from "recoil";
import { userRecoil } from "service/recoil/user";
import { message } from "@/components/ui/message";

function Basic() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "123123",
    },
  });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userRecoil);

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginQuery,
    onSuccess: ({ data }) => {
      setCookie(CookieKey.ACCESS_TOKEN, data.access_token);
      setUser({ ...data.user, isLoading: false });
      navigate("/dashboards/overview");
    },
    onError: (err) => {
      message.error(ErrorMessage[err.message] || err.message);
    },
  });

  const onSubmit = (values) => {
    login(values);
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                Đăng nhập
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
