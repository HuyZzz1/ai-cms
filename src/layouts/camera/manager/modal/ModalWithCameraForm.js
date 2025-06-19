import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { regionsRecoil } from "@/service/recoil/regions";
import CameraInputField from "./CameraInputField";
import CameraSelectField from "./CameraSelectField";
import { createCameraQuery } from "@/service/api/camera";
import { Button } from "@/components/ui/button";

const ModalWithCameraForm = forwardRef(({}, ref) => {
  const regionList = useRecoilValue(regionsRecoil);
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      device: "",
      location: "",
      url: "",
      regionId: "",
      lat: "",
      lng: "",
      isAI: false,
      lastChecked: "",
      status: "active",
    },
  });

  console.log("regionList", regionList);

  const { mutate, isPending } = useMutation({
    mutationFn: createCameraQuery,
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      alert("Tạo camera thất bại");
    },
  });

  const onSubmit = (data) => {
    data.lat = parseFloat(data.lat);
    data.lng = parseFloat(data.lng);
    mutate(data);
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  const onClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Tạo mới Camera"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-[9999]"
      className="w-full max-w-xl bg-white rounded-lg p-6 shadow-xl mx-auto mt-20 outline-none z-[10000]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Tạo mới Camera</h2>

        <CameraInputField
          name="device"
          label="Tên thiết bị"
          control={control}
          errors={errors}
        />
        <CameraInputField
          name="url"
          label="URL"
          control={control}
          errors={errors}
        />
        <CameraSelectField
          name="regionId"
          label="Khu vực"
          control={control}
          errors={errors}
          options={regionList}
        />

        <CameraInputField
          name="location"
          label="Địa chỉ"
          control={control}
          errors={errors}
        />

        <CameraInputField
          name="lat"
          label="Latitude"
          control={control}
          errors={errors}
        />
        <CameraInputField
          name="lng"
          label="Longitude"
          control={control}
          errors={errors}
        />

        <div className="flex items-center justify-center gap-2.5 pt-5">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-1 sm:w-full"
          >
            <span>Thêm mới</span>
          </Button>
          <Button
            onClick={onClose}
            className=" !bg-transparent text-black flex items-center gap-1 sm:w-full"
          >
            <span>Đóng</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
});

export default ModalWithCameraForm;
