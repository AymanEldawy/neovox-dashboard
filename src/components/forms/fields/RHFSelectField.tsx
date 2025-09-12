import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../../shared/ErrorText";
import ReactSelectNormal from "../../shared/ReactSelectNormal";
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
  options?: { value: string | number; label: string }[];
} & React.InputHTMLAttributes<HTMLSelectElement>;


const RHFSelectField = ({
  containerClassName,
  selectClassName,
  labelClassName,
  isDarkMode,
  selectProps,
  styles,
  label,
  col,
  small = true,
  hideErrors,
  readOnly,
  ...field
}: RHFSelectFieldProps) => {
  
  const { control } = useFormContext();
  const {
    name,
    optionValue = "id",
    optionLabel = "name",
    required,
    options,
    value: defaultValue,
  } = field;

  return (
    <Controller
      name={name!}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
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
              <ReactSelectNormal
                getOptionLabel={(option) => option?.[optionLabel]}
                getOptionValue={(option) => option?.[optionValue]}
                styles={styles}
                error={error}
                defaultValue={
                  options &&
                  options?.find(
                    (c) => c?.[optionValue] === (defaultValue || value)
                  )
                }
                value={
                  options &&
                  options?.find(
                    (c) => c?.[optionValue] === (defaultValue || value)
                  )
                }
                options={options}
                selectClassName={selectClassName}
                isDarkMode={isDarkMode}
                selectProps={selectProps}
                small={small}
                onChange={(option) => {
                  onChange(option?.[optionValue]);
                }}
                readOnly={readOnly}
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
