// @ts-nocheck
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RHFInput } from ".";

type RHFPasswordInputProps = {
  disabled?: boolean;
  isPassword?: boolean;
  extraMessage?: string;
  disableCheck?: boolean;
  name?: string;
  label?: string;
  containerClassName?: string;
};

const RHFPasswordInput = ({
  disabled,
  isPassword,
  extraMessage,
  disableCheck,
  name = "password",
  label = "password",
  containerClassName,
}: RHFPasswordInputProps) => {
  const { watch, register } = useFormContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibilityHandler = () =>
    setIsPasswordVisible((prev) => !prev);

  const showPasswordIndicator = !disableCheck && isPassword;

  const passwordValue = watch?.(name);

  return (
    <div className="relative">
      <RHFInput
        name={name}
        label={label}
        disabled={disabled}
        register={register}
        value={passwordValue}
        extraMessage={extraMessage}
        placeholder="passwordPlaceholder"
        containerClassName={containerClassName}
        showPasswordIndicator={showPasswordIndicator}
        type={isPasswordVisible ? "text" : "password"}
        alwaysShowExtraMessage={showPasswordIndicator}
        col
      />
      <button
        type="button"
        className="right-2 top-[26px] absolute w-fit bg-transparent border-none outline-none"
        onClick={togglePasswordVisibilityHandler}
      >
        {/* {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon color="#878a99" className="h-5 w-5" />} */}
        {/* {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon color="#878a99" className="h-5 w-5" />} */}
      </button>
    </div>
  );
};

export default RHFPasswordInput;
