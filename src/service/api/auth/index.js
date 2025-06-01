import http from "service/http";

export const loginQuery = async (params) => {
  return await http.post("/v1/auth/login", params);
};

export const meQuery = async () => {
  return await http.get("/v1/auth/me");
};
