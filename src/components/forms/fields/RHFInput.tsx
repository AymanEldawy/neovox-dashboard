import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from "../../shared/ErrorText";
import { Label } from "./Label";

type RHFInputProps = {
  containerClassName?: string;
  labelClassName?: string;
  label?: string;
  col?: boolean;
  hideErrors?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const RHFInput = ({
  containerClassName,
  labelClassName,
  label,
  col,
  hideErrors,
  ...field
}: RHFInputProps) => {
  const { control } = useFormContext();
  const { name, required, type, placeholder } = field

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
          <div className={`w-full ${containerClassName} flex ${col ? 'flex-col' : 'flex-row items-center'} gap-1`}>
            {label && (
              <Label
                name={name!}
                required={required}
                label={label}
                labelClassName={labelClassName}
              />
            )}
            <div className='relative w-full'>
              <input
                ref={ref}
                className={`border  h-[30px] text-xs font-medium read-only:bg-[#2289fb1c] w-full dark:read-only:bg-[#444] rounded p-1 focus-within:opacity-100 
                ${error ? "border-red-200 text-red-500" : ""}
                `}
                name={name!}
                onChange={(e) => {
                  onChange(type === 'number' ? + e.target.value : e.target.value);
                }}
                type={type}
                placeholder={placeholder || ''}
                {...field}
                value={value}
              />
              {error && !hideErrors ? (
                <ErrorText containerClassName="py-1">{error?.message}</ErrorText>
              ) : null}
            </div>
          </div>
        );
      }}
    />
  );
};

export default RHFInput;
