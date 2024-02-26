interface ButtonQtyProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function ButtonQty({
  className,
  disabled,
  onClick,
  children,
}: ButtonQtyProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-x-2 rounded border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow hover:bg-gray-50 ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
