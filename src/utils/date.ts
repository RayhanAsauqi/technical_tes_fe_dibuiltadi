import { format, parse, isValid } from "date-fns";
import { id } from "date-fns/locale";

const parseDateString = (date: string): Date => {
  let d = parse(date, "yyyy-MM-dd HH:mm:ss", new Date());
  if (!isValid(d)) {
    d = parse(date, "yyyy-MM-dd", new Date());
  }
  return d;
};

export const displayDateTime = (date?: Date | string | null): string => {
  if (!date) return "-";

  const d = typeof date === "string" ? parseDateString(date) : date;

  if (!isValid(d)) return "-";

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return format(d, "dd MMM yyyy", { locale: id });
  }

  return format(d, "dd MMM yyyy, HH:mm", { locale: id });
};
