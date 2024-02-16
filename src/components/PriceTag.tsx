import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span
      className={`inline-flex w-fit items-center justify-center transition-all ${className}`}
    >
      {formatPrice(price)}
    </span>
  );
}
