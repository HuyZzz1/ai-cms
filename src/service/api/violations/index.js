import http from "@/service/http";

export const getListViolationsQuery = async (params) => {
  const response = await http.post("/v1/violations/list", params);
  return response.data;
};

export const getListRuleViolationsQuery = async (params) => {
  const response = await http.post("/v1/violations/rule/list", params);
  return response.data;
};
