import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  name: string;
  children: ReactNode;
  disabled?: boolean;
  testId?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button = ({
  onClick,
  name,
  disabled = false,
  testId,
  children,
  variant = "primary",
  fullWidth = false,
  className,
}: ButtonPropTypes) => {
  const baseClassNames =
    "font-semibold uppercase transition-all border-2 rounded-lg px-4 py-2";

  const variantClassNames = {
    primary: "border-confirm text-confirm hover:bg-confirm hover:text-white",
    secondary: "border-cancel text-cancel hover:bg-cancel hover:text-white",
  };

  const disabledClassNames = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const widthClassNames = fullWidth ? "w-full" : "";

  const finalClassNames = `${baseClassNames} ${variantClassNames[variant]} ${disabledClassNames} ${widthClassNames} ${className || ""}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      name={name}
      data-testid={testId}
      className={finalClassNames}
    >
      {children}
    </button>
  );
};

export default Button;
