import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { regionsRecoil } from "@/service/recoil/regions";
import CameraInputField from "./CameraInputField";
import CameraSelectField from "./CameraSelectField";
import { createCameraQuery, updateCameraQuery } from "@/service/api/camera";
import { Button } from "@/components/ui/button";
import { message } from "@/components/ui/message";
import { ErrorMessage } from "@/service/message";
import { QueryKey } from "@/service/constant";

const EditCameraForm = forwardRef(({}, ref) => {
  const regionList = useRecoilValue(regionsRecoil);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const queryClient = useQueryClient();

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
      status: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCameraQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.cameras] });
      message.success("Cập nhật camera thành công");
      onClose();
    },
    onError: (err) => {
      message.error(ErrorMessage[err.message] || err.message);
    },
  });

  const onSubmit = (data) => {
    data.lat = parseFloat(data.lat);
    data.lng = parseFloat(data.lng);
    mutate({ ...data, id: item?.id });
  };

  useImperativeHandle(ref, () => ({
    open: (item) => {
      if (item) {
        setItem(item);
        reset({
          device: item.device || "",
          location: item.location || "",
          url: item.url || "",
          regionId: item.regionId?._id || "",
          lat: item.lat?.toString() || "",
          lng: item.lng?.toString() || "",
          status: item.status || "",
        });
      }
      setIsOpen(true);
    },
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
        <h2 className="text-xl font-bold text-gray-800">Cập nhật Camera</h2>

        <CameraSelectField
          name="status"
          label="Trạng thái"
          control={control}
          errors={errors}
          options={[
            {
              value: "active",
              label: "Đang hoạt động",
            },
            {
              value: "inactive",
              label: "Không hoạt động",
            },
            {
              value: "error",
              label: "Lỗi",
            },
          ]}
        />
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
          options={regionList?.map((opt) => ({
            value: opt._id,
            label: opt.name,
          }))}
        />

        <CameraInputField
          name="location"
          label="Vị trí"
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
            <span>Cập nhật</span>
          </Button>
          <Button variant="outline" onClick={onClose}>
            <span>Đóng</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
});

export default EditCameraForm;
