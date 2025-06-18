import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const CameraInputField = ({ name, label, control, errors, rules }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules || { required: `${label} là bắt buộc` }}
        render={({ field }) => (
          <Input
            {...field}
            className={`w-full ${errors?.[name] ? "border-red-500" : ""}`}
          />
        )}
      />
      {errors?.[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CameraInputField;
