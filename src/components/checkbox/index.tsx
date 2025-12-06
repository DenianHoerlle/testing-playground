import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export interface CheckboxPropTypes<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  testId?: string;
  variant?: "primary" | "secondary";
}

const Checkbox = <T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  testId,
  variant = "primary",
  className,
  ...rest
}: CheckboxPropTypes<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const checkboxBaseClassNames =
    "w-5 h-5 border-2 rounded transition-all cursor-pointer";

  const checkboxVariantClassNames = {
    primary: "border-confirm accent-confirm",
    secondary: "border-cancel accent-cancel",
  };

  const checkboxDisabledClassNames = "opacity-50 cursor-not-allowed";
  const checkboxEnabledClassNames = "cursor-pointer";

  const labelClassNames = "font-semibold text-sm";
  const containerClassNames = "flex items-center gap-2";

  const errorMessageClassNames = "text-cancel text-sm font-medium";
  const errorContainerClassNames = "flex items-start gap-2";

  const wrapperClassNames = error
    ? errorContainerClassNames
    : containerClassNames;
  const inputClassNames = `${checkboxBaseClassNames} ${checkboxVariantClassNames[variant]} ${disabled ? checkboxDisabledClassNames : checkboxEnabledClassNames} focus:outline-none ${className || ""}`;

  return (
    <div className={wrapperClassNames}>
      <input
        {...field}
        type="checkbox"
        id={name}
        disabled={disabled}
        data-testid={testId}
        className={inputClassNames}
        {...rest}
      />
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className={labelClassNames}>
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

export default Checkbox;
