import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";
type ChartBarDefaultProps = {
  data: Array<{ label: string; value: number }>;
  title?: string;
  description?: string;
  barLabel?: string;
  barColor?: string;
  xLabelFormatter?: (label: string) => string;
  footer?: React.ReactNode;
  tooltipFormatter?: (value: any, name?: any, props?: any) => React.ReactNode;
  element?: React.ReactNode;
};

export function ChartBarDefault({
  data,
  title = "Bar Chart",
  description = "",
  barLabel = "",
  barColor = "var(--chart-1)",
  xLabelFormatter = (label) => label,
  tooltipFormatter,
  element,
}: ChartBarDefaultProps) {
  const chartConfig = {
    value: {
      label: barLabel,
      color: barColor,
    },
  } satisfies ChartConfig;

  const defaultTooltipFormatter = (value: any) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };


  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        <div className="py-4">{element}</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart accessibilityLayer data={data} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={xLabelFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={tooltipFormatter ?? defaultTooltipFormatter}
                />
              }
            />
            <Bar dataKey="value" fill={barColor} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
