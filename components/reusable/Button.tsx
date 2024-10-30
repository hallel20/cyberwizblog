import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  className,
  children,
  type,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-600 disabled:bg-slate-400 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
