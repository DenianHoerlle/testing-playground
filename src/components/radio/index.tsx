import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export interface RadioPropTypes<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  value: string;
  disabled?: boolean;
  testId?: string;
  variant?: "primary" | "secondary";
}

const Radio = <T extends FieldValues>({
  control,
  name,
  label,
  value,
  disabled = false,
  testId,
  variant = "primary",
  className,
  ...rest
}: RadioPropTypes<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const radioBaseClassNames =
    "w-5 h-5 border-2 rounded-full transition-all cursor-pointer";

  const radioVariantClassNames = {
    primary: "border-confirm accent-confirm",
    secondary: "border-cancel accent-cancel",
  };

  const radioDisabledClassNames = "opacity-50 cursor-not-allowed";
  const radioEnabledClassNames = "cursor-pointer";

  const labelClassNames = "font-semibold text-sm";
  const containerClassNames = "flex items-center gap-2";

  const errorMessageClassNames = "text-cancel text-sm font-medium";
  const errorContainerClassNames = "flex items-start gap-2";

  const wrapperClassNames = error
    ? errorContainerClassNames
    : containerClassNames;

  const radioInputClassNames = `${radioBaseClassNames} ${radioVariantClassNames[variant]} ${disabled ? radioDisabledClassNames : radioEnabledClassNames} focus:outline-none ${error ? "border-cancel" : ""} ${className || ""}`;

  return (
    <div className={wrapperClassNames}>
      <input
        {...field}
        type="radio"
        id={`${name}-${value}`}
        value={value}
        disabled={disabled}
        data-testid={testId}
        className={radioInputClassNames}
        {...rest}
      />
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={`${name}-${value}`} className={labelClassNames}>
            {label}
          </label>
        )}
        {error && (
          <span className={errorMessageClassNames}>{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default Radio;
