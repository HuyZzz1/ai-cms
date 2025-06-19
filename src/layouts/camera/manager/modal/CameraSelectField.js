import Select from "react-select";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

const CameraSelectField = ({ name, label, control, errors, options }) => {
  const formattedOptions = options?.map((opt) => ({
    value: opt._id,
    label: opt.name,
  }));

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={{ required: `Vui lòng chọn ${label.toLowerCase()}` }}
        render={({ field }) => (
          <Select
            {...field}
            isSearchable={false}
            options={formattedOptions}
            value={
              formattedOptions.find((opt) => opt.value === field.value) || null
            }
            onChange={(selected) => field.onChange(selected?.value)}
            placeholder=""
            unstyled
            classNames={{
              control: ({ isFocused }) =>
                cn(
                  "flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                  isFocused ? "border-ring ring-ring" : "border-input",
                  "focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                ),
              valueContainer: () => "flex-1",
              input: () => "hidden",
              placeholder: () => "text-muted-foreground text-sm",
              singleValue: () => "text-sm",
              menu: () =>
                "absolute z-[10000] mt-1 w-full rounded-md border border-input bg-white text-sm shadow-md",
              option: ({ isFocused, isSelected }) =>
                cn(
                  "cursor-pointer px-3 py-2 transition-colors",
                  isFocused && "bg-gray-100",
                  isSelected && "bg-gray-200 font-medium"
                ),
              dropdownIndicator: () =>
                "text-gray-500 ml-2 cursor-pointer hover:text-black",
              indicatorsContainer: () => "flex items-center pr-2",
            }}
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={{
              control: () => ({}),
              menu: () => ({}),
              input: () => ({}),
              dropdownIndicator: (base) => ({ ...base, padding: 0 }),
            }}
          />
        )}
      />

      {errors?.[name] && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CameraSelectField;
