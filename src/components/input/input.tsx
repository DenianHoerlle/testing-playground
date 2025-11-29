import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

interface InputPropTypes<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  testId?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  testId,
  variant = "primary",
  className,
}: InputPropTypes<T>) => {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const baseClassNames =
    "font-semibold border-2 rounded-lg px-4 py-2 transition-all focus:outline-none ";

  const errorClassNames = "border-error text-error focus:border-error ";

  const variantClassNames = {
    primary: "border-confirm text-confirm focus:border-confirm ",
    secondary: "border-gray-300 text-gray-700 focus:border-gray-400 ",
  };

  const disabledClassNames = "opacity-50 cursor-not-allowed bg-gray-100";
  const enabledClassNames = "cursor-text";

  const labelClassNames = "font-semibold text-sm";
  const containerClassNames = "flex flex-col gap-2";

  const inputClassNames = `${baseClassNames} ${error ? errorClassNames : variantClassNames[variant]} ${disabled ? disabledClassNames : enabledClassNames} ${className || ""} `;

  const renderError = () => {
    if (!error) return null;

    const errorMessageClassNames = "text-cancel text-sm font-medium";

    return <span className={errorMessageClassNames}>{error.message}</span>;
  };

  return (
    <div className={containerClassNames}>
      <label htmlFor={name} className={labelClassNames}>
        {label}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        data-testid={testId}
        className={inputClassNames}
      />
      {renderError()}
    </div>
  );
};

export default Input;
