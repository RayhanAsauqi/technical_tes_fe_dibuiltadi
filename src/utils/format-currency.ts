export const formatCurrency = (amount: string | number) => {
  const num = Number.parseFloat(amount.toString());
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};
export const formatLargeNumber = (amount: string) => {
  const num = Number.parseFloat(amount);
  if (isNaN(num)) return amount;

  const format = (val: number, suffix: string) => `${val.toFixed(1).replace(".", ",")} ${suffix}`;

  if (num >= 1e12) return format(num / 1e12, "T");
  if (num >= 1e9) return format(num / 1e9, "M");
  if (num >= 1e6) return format(num / 1e6, "JT");

  return new Intl.NumberFormat("id-ID").format(num);
};
