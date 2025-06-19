export const Role = {
  merchant_admin: "merchant_admin",
  merchant_user: "merchant_user",
  master_admin: "master_admin",
};

export const RoleName = {
  master_admin: "Quản trị hệ thống",
  merchant_admin: "Quản lý hệ thống",
  merchant_user: "Nhân viên",
};

export const QueryKey = {
  regions: "regions",
  cameras: "cameras",
};

export const DEFAULT_FILTER = {
  filter: {},
  page: 1,
  limit: 20,
  sort: {
    createdAt: -1,
  },
};
