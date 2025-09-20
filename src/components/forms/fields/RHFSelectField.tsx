import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { ErrorText } from "../../shared/ErrorText";
import { Label } from "./Label";

type RHFSelectFieldProps = {
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  col?: boolean;
  hideErrors?: boolean;
  selectClassName?: string;
  isDarkMode?: boolean;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  styles?: React.CSSProperties;
  small?: boolean;
  readOnly?: boolean;
  optionValue?: string;
  optionLabel?: string;
  options?: { id: string; name: string; }[];
} & React.InputHTMLAttributes<HTMLSelectElement>;


const RHFSelectField = ({
  containerClassName,
  labelClassName,
  label,
  col,
  hideErrors,
  readOnly,
  ...field
}: RHFSelectFieldProps) => {

  const { control } = useFormContext();
  const {
    name,
    required,
    options,
    value: defaultValue,
  } = field;

  return (
    <Controller
      name={name!}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div
            className={`w-full ${containerClassName} flex ${col ? "flex-col" : "flex-row items-center"
              } gap-1`}
          >
            {label && (
              <Label
                name={name!}
                required={required}
                label={label}
                labelClassName={labelClassName}
              />
            )}
            <div className="w-full relative">
              <Select
                getOptionLabel={(option) => option?.id}
                getOptionValue={(option) => option?.name}
                defaultValue={
                  options &&
                  options?.find(
                    (c) => c?.id === (defaultValue || value)
                  )
                }
                value={
                  options &&
                  options?.find(
                    (c) => c?.id === (defaultValue || value)
                  )
                }
                options={options}
                onChange={(option) => {
                  onChange(option?.id);
                }}
                isDisabled={readOnly}
              />

              {error && !hideErrors ? (
                <ErrorText containerClassName="py-1">
                  {error?.message}
                </ErrorText>
              ) : null}
            </div>
          </div>
        );
      }}
    />
  );
};

export default RHFSelectField;
