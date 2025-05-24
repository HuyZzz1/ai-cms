import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RiEdit2Fill } from "react-icons/ri";
import DefaultCell from "layouts/dashboards/sales/components/DefaultCell";

const ActionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <RiEdit2Fill className="mr-1" size={22} /> Tính năng 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RiEdit2Fill className="mr-1" size={22} /> Tính năng 2
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RiEdit2Fill className="mr-1" size={22} /> Tính năng 3
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RiEdit2Fill className="mr-1" size={22} /> Tính năng 4
        </MenuItem>
      </Menu>
    </>
  );
};

const dataTableData = {
  columns: [
    { Header: "ID Camera", accessor: "id" },
    { Header: "Tên Camera", accessor: "name" },
    { Header: "Vị trí", accessor: "location" },
    { Header: "Tọa độ", accessor: "coordinates" },
    { Header: "Loại Camera", accessor: "type" },
    { Header: "Tình trạng", accessor: "status" },
    { Header: "Tác vụ", accessor: "actions", align: "center" },
  ],

  rows: [
    {
      id: <DefaultCell>CAM001</DefaultCell>,
      name: <DefaultCell>Camera Cổng chính</DefaultCell>,
      location: <DefaultCell>Cổng chính toà nhà A</DefaultCell>,
      coordinates: <DefaultCell>21.0285, 105.8542</DefaultCell>,
      type: <DefaultCell>4K</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM002</DefaultCell>,
      name: <DefaultCell>Camera Sảnh</DefaultCell>,
      location: <DefaultCell>Sảnh tầng 1</DefaultCell>,
      coordinates: <DefaultCell>21.0287, 105.8545</DefaultCell>,
      type: <DefaultCell>HD</DefaultCell>,
      status: <DefaultCell>Đang bảo trì</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM003</DefaultCell>,
      name: <DefaultCell>Camera Hành lang</DefaultCell>,
      location: <DefaultCell>Hành lang tầng 2</DefaultCell>,
      coordinates: <DefaultCell>21.0289, 105.8547</DefaultCell>,
      type: <DefaultCell>360</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM004</DefaultCell>,
      name: <DefaultCell>Camera Thang máy</DefaultCell>,
      location: <DefaultCell>Trong thang máy</DefaultCell>,
      coordinates: <DefaultCell>21.0290, 105.8548</DefaultCell>,
      type: <DefaultCell>HD</DefaultCell>,
      status: <DefaultCell>Không hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM005</DefaultCell>,
      name: <DefaultCell>Camera Nhà xe</DefaultCell>,
      location: <DefaultCell>Tầng hầm B1</DefaultCell>,
      coordinates: <DefaultCell>21.0283, 105.8541</DefaultCell>,
      type: <DefaultCell>4K</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM006</DefaultCell>,
      name: <DefaultCell>Camera Văn phòng</DefaultCell>,
      location: <DefaultCell>Phòng làm việc tầng 3</DefaultCell>,
      coordinates: <DefaultCell>21.0292, 105.8549</DefaultCell>,
      type: <DefaultCell>HD</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM007</DefaultCell>,
      name: <DefaultCell>Camera Hội trường</DefaultCell>,
      location: <DefaultCell>Tầng 4 - Hội trường</DefaultCell>,
      coordinates: <DefaultCell>21.0293, 105.8505</DefaultCell>,
      type: <DefaultCell>360</DefaultCell>,
      status: <DefaultCell>Đang bảo trì</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM008</DefaultCell>,
      name: <DefaultCell>Camera Hành lang B</DefaultCell>,
      location: <DefaultCell>Tầng 5 - Hành lang B</DefaultCell>,
      coordinates: <DefaultCell>21.0294, 105.8552</DefaultCell>,
      type: <DefaultCell>HD</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM009</DefaultCell>,
      name: <DefaultCell>Camera Phòng họp</DefaultCell>,
      location: <DefaultCell>Phòng họp tầng 6</DefaultCell>,
      coordinates: <DefaultCell>21.0295, 105.8552</DefaultCell>,
      type: <DefaultCell>4K</DefaultCell>,
      status: <DefaultCell>Hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
    {
      id: <DefaultCell>CAM010</DefaultCell>,
      name: <DefaultCell>Camera Lối thoát hiểm</DefaultCell>,
      location: <DefaultCell>Cầu thang thoát hiểm</DefaultCell>,
      coordinates: <DefaultCell>21.0296, 105.8553</DefaultCell>,
      type: <DefaultCell>HD</DefaultCell>,
      status: <DefaultCell>Không hoạt động</DefaultCell>,
      actions: <ActionMenu />,
    },
  ],
};

export default dataTableData;
