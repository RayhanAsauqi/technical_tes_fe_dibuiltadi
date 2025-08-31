import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLargeNumber } from "@/utils/format-currency";
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
  yLabelFormatter?: (value: number) => string;
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
  yLabelFormatter = (val) => formatLargeNumber(val.toString()),
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
            <YAxis tickFormatter={yLabelFormatter} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;

                return (
                  <div className="rounded-md border bg-popover px-3 py-2 shadow-md">
                    {/* Label (misalnya X-axis value) */}
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      {xLabelFormatter ? xLabelFormatter(label) : label}
                    </p>

                    {/* Data lines */}
                    {payload.map((entry, idx) => (
                      <div key={`tooltip-item-${idx}`} className="flex items-center gap-2 text-sm">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-foreground">{entry.name ?? entry.dataKey}:</span>
                        <span className="font-semibold text-foreground">
                          {tooltipFormatter
                            ? tooltipFormatter(
                                entry.value as number,
                                entry.name !== undefined ? String(entry.name) : undefined
                              )[0]
                            : (entry.value as number)?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />

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
