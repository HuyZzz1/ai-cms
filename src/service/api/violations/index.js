import http from "@/service/http";

export const getListViolationsQuery = async (params) => {
  const response = await http.post("/v1/violations/list", params);
  return response.data;
};

export const getListRuleViolationsQuery = async (params) => {
  const response = await http.post("/v1/violations/rule/list", params);
  return response.data;
};

export const getPreviewCaptureQuery = async (path) => {
  const encodedPath = encodeURIComponent(path);
  const res = await http.get(`/v1/violations/preview-capture/${encodedPath}`, {
    responseType: "blob",
  });

  let mimeType = res.data.type;

  if (mimeType === "application/mp4") {
    mimeType = "video/mp4";
  }

  const fixedBlob = new Blob([res.data], { type: mimeType });
  const url = URL.createObjectURL(fixedBlob);

  const fileType = mimeType.startsWith("image")
    ? "image"
    : mimeType.startsWith("video")
    ? "video"
    : "unknown";

  return { url, fileType, mimeType };
};
