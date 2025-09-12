import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from "../../shared/ErrorText";
import { Label } from "./Label";


type RHFTextareaProps = {
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  hideErrors?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;


const RHFTextarea = ({
  containerClassName,
  labelClassName,
  label,
  hideErrors,
  ...field
}: RHFTextareaProps) => {
  const { control } = useFormContext();
  const { name, required } = field

  return (
    <Controller
      name={name!}
      control={control}
      defaultValue={null}
      render={({
        field: { onChange, ref, value },
        fieldState: { error },
      }) => {
        return (
          <div className={`w-full ${containerClassName} flex flex-col gap-1`}>
            {label && (
              <Label
                name={name!}
                required={required}
                label={label}
                labelClassName={`${labelClassName} !w-full`}
              />
            )}
            <textarea
              ref={ref}
              className={`border min-h-16 text-xs font-medium read-only:bg-[#2289fb1c] w-full dark:read-only:bg-[#444] rounded p-1 focus-within:opacity-100 
                ${error ? "border-red-200 text-red-500" : ""}
                `}
              name={name}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              {...field}
              value={value}
            />

            {error && !hideErrors ? (
              <ErrorText containerClassName="py-1">{error?.message}</ErrorText>
            ) : null}
          </div>
        );
      }}
    />
  );
};

export default RHFTextarea;
