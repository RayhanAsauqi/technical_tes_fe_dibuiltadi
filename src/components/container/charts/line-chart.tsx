import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type ChartLineDefaultProps = {
  title?: string;
  description?: string;
  data: Array<Record<string, any>>;
  element?: React.ReactNode;
  lines: Array<{
    dataKey: string;
    name?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }>;
  xKey: string;
  xLabelFormatter?: (label: string) => string;
  tooltipFormatter?: (value: number, name?: string) => [string, string];
  height?: number;
  children?: React.ReactNode;
};

export function ChartLineDefault({
  title,
  description,
  data,
  lines,
  xKey,
  xLabelFormatter,
  tooltipFormatter,
  height = 300,
  children,
  element,
}: ChartLineDefaultProps) {
  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        <div className="py-4">{element}</div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={xKey} tickFormatter={xLabelFormatter} />
            <YAxis />
            <Tooltip formatter={tooltipFormatter} />
            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke ?? "var(--primary)"}
                strokeWidth={line.strokeWidth ?? 2}
                strokeDasharray={line.strokeDasharray}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {children}
      </CardContent>
    </Card>
  );
}
