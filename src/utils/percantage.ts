export function normalizePercentage(value: number) {
  if (value <= 1) {
    return Math.round(value * 100);
  }
  return Math.round(value);
}
