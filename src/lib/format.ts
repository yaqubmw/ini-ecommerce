export function formatPrice(price: number) {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
