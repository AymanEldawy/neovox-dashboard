// @ts-nocheck
import { ErrorText } from "@/components/shared/ErrorText";
import { Controller, useFormContext } from "react-hook-form";
import InputColor from "react-input-color";
import { Label } from "./Label";

type RHFColorPickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  col?: boolean;
  hideErrors?: boolean;
};

const RHFColorPicker = ({
  name,
  label,
  disabled,
  required = true,
  containerClassName,
  labelClassName,
  col,
  hideErrors,
  ...field
}: RHFColorPickerProps) => {
  const { control, getFieldState } = useFormContext();
  const { invalid, error } = getFieldState(name);
  const { message } = error || {};

  const inputClassName = `${invalid ? "error" : ""} rhf-input-field`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className={`w-full ${containerClassName} flex ${col ? 'flex-col' : 'flex-row items-center'} gap-1`}>
          {label && (
            <Label
              name={name}
              required={required}
              label={label}
              labelClassName={labelClassName}
            />
          )}
          <div className="w-full relative" >
            <InputColor
              value={value}
              placement="bottom"
              disabled={disabled}
              className={inputClassName}
              initialValue={value || "#2954c3"}
              onChange={(pickedColor: { hex: string }) => onChange(pickedColor.hex)}
              {...field}
            />
            {error && !hideErrors ? (
              <ErrorText containerClassName="py-1">{message}</ErrorText>
            ) : null}
          </div>
        </div>
      )}
    />
  );
};

export default RHFColorPicker;
