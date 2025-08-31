"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  User,
  Building2,
} from "lucide-react";

import { useFetch } from "@/hooks/use-fetch";
import type {
  DailyTransactionsRes,
  MonthlyTransactionRes,
  TopCustomersRes,
  YearlyTransactionsRes,
} from "@/lib/types/res/summary";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import { useState } from "react";
import { formatLargeNumber } from "@/utils/format-currency";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { SalesRes } from "@/lib/types/res/sales";
import { YearPicker } from "@/components/ui/year";
import { MonthYearPicker } from "@/components/ui/year-month-picker";
import { DatePicker } from "@/components/ui/date-picker";
import ShadcnTable from "../shadcn-table";
import ShadcnUiSelect from "../shadcnui-select";
import { ChartBarDefault } from "../charts/bar-chart";
import { Label } from "@/components/ui/label";
import { ChartLineDefault } from "../charts/line-chart";

export default function Summary() {
  const [rowLimit, setRowLimit] = useState<number>(5);
  const [filters, setFilters] = useState({
    salesCode: "796540",
  });
  const [dateRangeDaily, setDateRangeDaily] = useState<{ startDate: string; endDate: string }>({
    startDate: "2024-01-09",
    endDate: "2024-12-01",
  });
  const [dateRangeTopCustomer, setDateRangeTopCustomer] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "2024-01-09",
    endDate: "2024-12-01",
  });
  const [selectedYear, setSelectedYear] = useState<number | undefined>(2025);
  const [startYearMonth, setStartYearMonth] = useState<{ month: number; year: number }>({
    year: 2024,
    month: 0,
  });
  const [endYearMonth, setEndYearMonth] = useState<{ month: number; year: number }>({
    year: 2025,
    month: 11,
  });

  const startMonth =
    startYearMonth.year && typeof startYearMonth.month === "number"
      ? `${startYearMonth.year}-${(startYearMonth.month + 1).toString().padStart(2, "0")}`
      : "";

  const endMonth =
    endYearMonth.year && typeof endYearMonth.month === "number"
      ? `${endYearMonth.year}-${(endYearMonth.month + 1).toString().padStart(2, "0")}`
      : "";

  const { data: dailyData } = useFetch<DailyTransactionsRes>(
    `${API_ENDPOINT}/summaries/daily-transactions?startDate=${dateRangeDaily.startDate}&endDate=${dateRangeDaily.endDate}&salesCode=${filters.salesCode}`
  );

  const { data: monthlyData } = useFetch<MonthlyTransactionRes>(
    `${API_ENDPOINT}/summaries/monthly-transactions?startMonth=${startMonth}&endMonth=${endMonth}&salesCode=${filters.salesCode}`
  );
  const { data: yearlyData } = useFetch<YearlyTransactionsRes>(
    `${API_ENDPOINT}/summaries/yearly-transactions?year=${selectedYear}&salesCode=${filters.salesCode}`
  );
  const { data: topCustomer, loading } = useFetch<TopCustomersRes>(
    `${API_ENDPOINT}/summaries/top-customers?startDate=${dateRangeTopCustomer.startDate}&endDate=${dateRangeTopCustomer.endDate}&limit=${rowLimit}`
  );
  const { data: SalesList } = useFetch<SalesRes>(`${API_ENDPOINT}/sales/list`);

  const topCustomerRows = (topCustomer?.items ?? []).map((item, idx) => ({
    no: idx + 1,
    id: item.customer.code,
    customerName: item.customer.name,
    customerCode: item.customer.code,
    companyType: (
      <Badge variant="outline" className="gap-1">
        <span>{item.customer.companyType}</span>
        {item.customer.companyType === "person" ? (
          <User className="w-3 h-3" />
        ) : (
          <Building2 className="w-3 h-3" />
        )}
      </Badge>
    ),
    amount: formatLargeNumber(item.amount),
  }));

  const isPositiveGrowth = Number.parseFloat(yearlyData?.percentage ?? "") > 0;
  const chartData =
    monthlyData?.items.map((item) => ({
      month: item.month,
      current: Number(item.current),
      previous: Number(item.previous),
      growth: Number(item.growth),
    })) || [];
  return (
    <div className=" space-y-8 bg-background min-h-screen">
      <div className="space-y-4">
        <div className="flex flex-col  gap-2">
          <ShadcnUiSelect
            label="Sales"
            value={filters.salesCode}
            onChange={(val) => setFilters((prev) => ({ ...prev, salesCode: val }))}
            options={[
              { label: "All Sales Representatives", value: "all" },
              ...(SalesList?.items.map((sales) => ({
                label: sales.name,
                value: sales.code,
              })) ?? []),
            ]}
            placeholder="Filter by Sales Representative"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatLargeNumber(
                (Number.parseFloat(yearlyData?.current.amount ?? "0") / 12).toString()
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              {isPositiveGrowth ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={isPositiveGrowth ? "text-green-500" : "text-red-500"}>
                {yearlyData?.percentage}% from last year
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Average monthly revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatLargeNumber(
                (Number.parseFloat(yearlyData?.current.amount ?? "0") / 365).toString()
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              {isPositiveGrowth ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={isPositiveGrowth ? "text-green-500" : "text-red-500"}>
                {yearlyData?.percentage}% from last year
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Average daily revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Transaction Chart */}
      <ChartBarDefault
        title="Daily Transaction"
        description="Recent daily transaction amounts"
        element={
          <div className="flex justify-end gap-2">
            <div className="space-y-2">
              <Label>Start</Label>
              <DatePicker
                date={dateRangeDaily.startDate ? new Date(dateRangeDaily.startDate) : undefined}
                onDateChange={(date) =>
                  setDateRangeDaily((prev) => ({
                    ...prev,
                    startDate: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                placeholder="Start date"
              />
            </div>
            <div className="space-y-2">
              <Label>End</Label>
              <DatePicker
                date={dateRangeDaily.endDate ? new Date(dateRangeDaily.endDate) : undefined}
                onDateChange={(date) =>
                  setDateRangeDaily((prev) => ({
                    ...prev,
                    endDate: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                placeholder="End date"
                disabled={!dateRangeDaily.startDate}
              />
            </div>
          </div>
        }
        data={
          Array.isArray(dailyData?.items)
            ? dailyData.items.map((item) => ({
                label: item.date,
                value: Number(item.amount),
              }))
            : []
        }
        tooltipFormatter={(value: number) => [`${formatLargeNumber(value.toString())}`]}
      />
      {/* Monthly Growth Table */}
      <ChartLineDefault
        title="Monthly Transactions"
        description="Recent monthly transaction amounts "
        element={
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              <Label>Start</Label>
              <MonthYearPicker
                minYear={1900}
                maxYear={2030}
                value={startYearMonth}
                onChange={(yearMonth: { month: number; year: number }) =>
                  setStartYearMonth(yearMonth)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End</Label>
              <MonthYearPicker
                minYear={1900}
                maxYear={2030}
                value={endYearMonth}
                onChange={(yearMonth: { month: number; year: number }) =>
                  setEndYearMonth(yearMonth)
                }
              />
            </div>
          </div>
        }
        data={chartData}
        lines={[
          {
            dataKey: "previous",
            name: "Previous",
            stroke: "#94a3b8",
            strokeWidth: 2,
            strokeDasharray: "5 5",
          },
          {
            dataKey: "current",
            name: "Current",
            stroke: "var(--primary)",
            strokeWidth: 3,
          },
        ]}
        xKey="month"
        tooltipFormatter={(value: number, name?: string) => [
          `${formatLargeNumber(value.toString())}`,
          name ?? "",
        ]}
        height={400}
      />

      {/* Yearly Transaction  */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <div className="flex flex-row items-center justify-between space-y-0 ">
            <div>
              <CardTitle className="text-sm font-medium">Yearly Transaction</CardTitle>
            </div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Current ({yearlyData?.current.year})
              </div>
              <div className="text-2xl font-bold">
                {formatLargeNumber(yearlyData?.current?.amount ?? "0")}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Previous ({yearlyData?.previous.year})
              </div>
              <div className="text-lg font-semibold text-muted-foreground">
                {formatLargeNumber(yearlyData?.previous?.amount ?? "0")}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            {isPositiveGrowth ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={isPositiveGrowth ? "text-green-500" : "text-red-500"}>
              {yearlyData?.percentage}% from last year
            </span>
          </div>

          <div className="flex justify-end ">
            <div className="space-y-2">
              <Label>Year</Label>
              <YearPicker
                minYear={1900}
                maxYear={2030}
                className="w-20"
                value={selectedYear}
                onChange={(year: number) => setSelectedYear(year)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Top Customer */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Highest revenue generating customers</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ShadcnUiSelect
              label="Tops"
              value={rowLimit.toString()}
              onChange={(val) => setRowLimit(Number(val))}
              options={[
                {
                  label: "5",
                  value: "5",
                },
                {
                  label: "10",
                  value: "10",
                },
                {
                  label: "20",
                  value: "20",
                },
                {
                  label: "50",
                  value: "50",
                },
                {
                  label: "100",
                  value: "100",
                },
              ]}
            />
            <div className="flex justify-end gap-2">
              <div className="space-y-2">
                <Label>Start</Label>
                <DatePicker
                  date={
                    dateRangeTopCustomer.startDate
                      ? new Date(dateRangeTopCustomer.startDate)
                      : undefined
                  }
                  onDateChange={(date) =>
                    setDateRangeTopCustomer((prev) => ({
                      ...prev,
                      startDate: date ? format(date, "yyyy-MM-dd") : "",
                    }))
                  }
                  placeholder="Start date"
                />
              </div>
              <div className="space-y-2">
                <Label>End</Label>
                <DatePicker
                  date={
                    dateRangeTopCustomer.endDate
                      ? new Date(dateRangeTopCustomer.endDate)
                      : undefined
                  }
                  onDateChange={(date) =>
                    setDateRangeTopCustomer((prev) => ({
                      ...prev,
                      endDate: date ? format(date, "yyyy-MM-dd") : "",
                    }))
                  }
                  placeholder="End date"
                  disabled={!dateRangeDaily.startDate}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ShadcnTable
            rows={topCustomerRows}
            columns={[
              { key: "no", title: "No" },
              { key: "customerCode", title: "Customer Code" },
              { key: "customerName", title: "Customer Name" },
              { key: "companyType", title: "Company Type" },
              { key: "amount", title: "Amount" },
            ]}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
