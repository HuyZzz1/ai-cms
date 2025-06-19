import http from "@/service/http";

export const getListRegionsQuery = async (params) => {
  return await http.post("/v1/regions/list", params);
};

export const getListCameraQuery = async (params) => {
  const response = await http.post("/v1/cameras/list", params);
  return response.data;
};

export const createCameraQuery = async (params) => {
  return await http.post("/v1/cameras", params);
};

export const updateCameraQuery = async (params) => {
  return await http.patch(`/v1/cameras/${params.id}`, params);
};

export const deleteCameraQuery = async (params) => {
  return await http.delete(`/v1/cameras/${params.id}`, params);
};
