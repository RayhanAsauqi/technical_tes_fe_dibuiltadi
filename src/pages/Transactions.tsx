import ShadcnTable from "@/components/container/shadcn-table";
import ShadcnUiSelect from "@/components/container/shadcnui-select";
import DefaultLayout from "@/components/layouts/default-layout";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Pagination from "@/components/ui/pagination";
import useDebounceState from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { CustomerRes } from "@/lib/types/res/customer";
import type { SalesRes } from "@/lib/types/res/sales";
import type { TransactionsRes } from "@/lib/types/res/transactions";
import { displayDateTime } from "@/utils/date";
import { formatLargeNumber } from "@/utils/format-currency";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: "1",
    perPage: "10",
    sortDirection: "desc",
    sortBy: "created_at",
  });
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "2023-01-01",
    endDate: "2026-12-30",
  });
  const [filters, setFilters] = useState({
    customerCode: "",
    salesCode: "",
  });

  const [debouncedSearch, search, setSearch] = useDebounceState("", 900);
  const { data, loading } = useFetch<TransactionsRes>(
    `${API_ENDPOINT}/transactions?page=${pagination.page}&perPage=${pagination.perPage}&sortBy=created_at&sortDirection=${pagination.sortDirection}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&search=${debouncedSearch}&customerCode=${filters.customerCode}&salesCode=${filters.salesCode}`
  );
  const { data: customerList } = useFetch<CustomerRes>(`${API_ENDPOINT}/customers/list`);
  const { data: SalesList } = useFetch<SalesRes>(`${API_ENDPOINT}/sales/list`);

  const uniqueCustomers =
    customerList?.items.reduce((acc, curr) => {
      if (!acc.find((c) => c.code === curr.code)) {
        acc.push(curr);
      }
      return acc;
    }, [] as typeof customerList.items) || [];

  const transactions = (data?.items ?? []).map((item, idx) => ({
    no: (Number(pagination.page) - 1) * Number(pagination.perPage) + (idx + 1),
    id: item.referenceNo,
    customer: item.customer.name,
    salesName: item.sales,
    amountDue: formatLargeNumber(item.amountDue),
    amountUntaxed: formatLargeNumber(item.amountUntaxed),
    amountTotal: formatLargeNumber(item.amountTotal),
    dateOrder: displayDateTime(item.dateOrder),
    dateDue: displayDateTime(item.dateDue),
    paidAt: displayDateTime(item.paidAt),
    createdAt: displayDateTime(item.createdAt),

    action: (
      <div className="flex gap-2">
        <Button onClick={() => navigate(`/transactions/${item.referenceNo}`)}>
          <Eye />
        </Button>
      </div>
    ),
  }));
  return (
    <DefaultLayout pageTitle="Transactions" subTitle="Your transactions activity">
      <div className="flex flex-col gap-5 pb-8 pt-2  md:justify-between">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            placeholder="Search name customer.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full "
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2  ">
          <div className=" w-full  grid  md:grid-cols-3 lg:flex gap-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                date={dateRange.startDate ? new Date(dateRange.startDate) : undefined}
                onDateChange={(date) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                placeholder="Select start date"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                date={dateRange.endDate ? new Date(dateRange.endDate) : undefined}
                onDateChange={(date) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: date ? format(date, "yyyy-MM-dd") : "",
                  }))
                }
                placeholder="Select end date"
                className="w-full"
                disabled={!dateRange.startDate}
              />
            </div>

            <div className="space-y-2">
              <Label>Sort Direction</Label>
              <ShadcnUiSelect
                value={pagination.sortDirection}
                onChange={(val) =>
                  setPagination((prev) => ({ ...prev, page: "1", sortDirection: val }))
                }
                className="w-full"
                options={[
                  {
                    label: "Ascending",
                    value: "asc",
                  },
                  {
                    label: "Descending",
                    value: "desc",
                  },
                ]}
                placeholder="Sort direction"
              />
            </div>

            <div className="space-y-2">
              <Label>Customer</Label>
              <ShadcnUiSelect
                value={filters.customerCode}
                onChange={(val) => setFilters((prev) => ({ ...prev, customerCode: val }))}
                options={[
                  ...(uniqueCustomers ?? []).map((customer) => ({
                    label: customer.name,
                    value: customer.code,
                  })),
                ]}
                className="w-full"
                placeholder="Filter by Customer"
              />
            </div>
            <div className="space-y-2">
              <Label>Sales</Label>
              <ShadcnUiSelect
                value={filters.salesCode}
                onChange={(val) => setFilters((prev) => ({ ...prev, salesCode: val }))}
                options={[
                  ...(SalesList?.items ?? []).map((sales) => ({
                    label: sales.name,
                    value: sales.code,
                  })),
                ]}
                className="w-full"
                placeholder="Filter by Sales"
              />
            </div>
          </div>
        </div>
      </div>
      <ShadcnTable
        rows={transactions}
        columns={[
          { key: "no", title: " No" },
          { key: "salesName", title: " Sales Name" },
          { key: "customer", title: " Customer" },
          { key: "amountDue", title: " Amount Due" },
          { key: "amountUntaxed", title: " Amount Untaxed" },
          { key: "amountTotal", title: " Amount Total" },
          { key: "dateOrder", title: " Date Order" },
          { key: "dateDue", title: " Date Due" },
          { key: "paidAt", title: " Paid At" },
          { key: "createdAt", title: " Created At" },

          { key: "action", title: "Action" },
        ]}
        isLoading={loading}
        emptyStateMessage="not found"
      />

      <div className="py-2">
        <Pagination
          currentPage={Number(data?.currentPage)}
          lastPage={Number(data?.lastPage)}
          perPage={Number(data?.perPage)}
          total={Number(data?.total)}
          onPageChange={(page: number) =>
            setPagination((prev) => ({ ...prev, page: page.toString() }))
          }
          onPerPageChange={(perPage: number) =>
            setPagination((prev) => ({
              ...prev,
              page: "1",
              perPage: perPage.toString(),
            }))
          }
          isLoading={loading}
        />
      </div>
    </DefaultLayout>
  );
}
