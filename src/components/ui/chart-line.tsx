import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface LineChartData {
  [key: string]: string | number;
}

export interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  name?: string;
}

export interface ReusableLineChartProps {
  data?: LineChartData[];
  title: string;
  description?: string;
  height?: number;
  xAxisKey: string;
  lines: LineConfig[];
  formatTooltip?: (value: number, name: string) => [string, string];
  transformData?: (data: any[]) => LineChartData[];
}

export function ReusableLineChart({
  data = [],
  title,
  description,
  height = 300,
  xAxisKey,
  lines,
  formatTooltip,
  transformData,
}: ReusableLineChartProps) {
  const chartData = transformData ? transformData(data) : data;

  const defaultTooltipFormatter = (value: number, name: string) => [value.toString(), name];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip formatter={formatTooltip || defaultTooltipFormatter} />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth || 2}
                strokeDasharray={line.strokeDasharray}
                name={line.name || line.dataKey}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
