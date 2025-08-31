import { ReusableLineChart, type LineChartData } from "./chart-line";

export interface UniversalLineChartProps<T = any> {
  data?: T[];
  title?: string;
  description?: string;
  height?: number;
  xAxisKey: string;
  lines: Array<{
    dataKey: string;
    stroke: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    name?: string;
  }>;
  transformData?: (items: T[]) => LineChartData[];
  formatTooltip?: (value: number, name: string) => [string, string];
  formatValue?: (value: any) => number;
  className?: string;
}

export function UniversalLineChart<T = any>({
  data = [],
  title = "Chart",
  description = "Data visualization",
  height = 300,
  xAxisKey,
  lines,
  transformData,
  formatTooltip,
  formatValue = (value) => Number.parseFloat(value.toString()),
//   className,
}: UniversalLineChartProps<T>) {
  const defaultTransformData = (items: T[]): LineChartData[] => {
    return items.map((item: any) => {
      const transformed: any = { [xAxisKey]: item[xAxisKey] };

      lines.forEach((line) => {
        transformed[line.dataKey] = formatValue(item[line.dataKey]);
      });

      return transformed;
    });
  };

  const defaultFormatTooltip = (value: number, name: string): [string, string] => [
    value.toLocaleString(),
    name,
  ];

  const transformedData = (transformData || defaultTransformData)(data);

  return (
    <ReusableLineChart
      data={transformedData}
      title={title}
      description={description}
      height={height}
      xAxisKey={xAxisKey}
      lines={lines}
      formatTooltip={formatTooltip || defaultFormatTooltip}
    />
  );
}
