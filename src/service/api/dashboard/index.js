import http from "@/service/http";

export const getViolationsByDistrictQuery = async () => {
  return await http.get(`/v1/dashboard/violations-by-district`);
};

export const getTrafficHotspotsQuery = async () => {
  return await http.get(`/v1/dashboard/traffic-hotspots`);
};

export const getDashboardOverviewAnalyticsQuery = async () => {
  return await http.get(`/v1/dashboard/analysis-charts`);
};

export const getDashboardOverviewChartQuery = async () => {
  return await http.get(`/v1/dashboard/overview-charts`);
};

export const getDashboardViolationRatePerRuleQuery = async () => {
  return await http.get(`/v1/dashboard/violation-rate-per-rule`);
};

export const getDashboardViolationByTimeFrameQuery = async () => {
  return await http.get(`/v1/dashboard/violations-by-time-frame`);
};
