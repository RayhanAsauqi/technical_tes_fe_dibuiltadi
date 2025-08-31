import AddCustomerModal from "@/components/container/modals/customers/add-customer";
import DetailCustomerModal from "@/components/container/modals/customers/detail-customer";
import EditCustomerModal from "@/components/container/modals/customers/edit-customer";
import ShadcnTable from "@/components/container/shadcn-table";
import ShadcnUiSelect from "@/components/container/shadcnui-select";
import DefaultLayout from "@/components/layouts/default-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import useDebounceState from "@/hooks/use-debounce";
import useDisclosure from "@/hooks/use-disclosure";
import { useFetch } from "@/hooks/use-fetch";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { CitiesRes } from "@/lib/types/res/cities";
import type { CustomerRes } from "@/lib/types/res/customer";
import type { ProvinceRes } from "@/lib/types/res/province";
import { displayDateTime } from "@/utils/date";
import { normalizePercentage } from "@/utils/percantage";
import { format } from "date-fns";
import { Building2, Eye, Pencil, Plus, User, UserCheck, UserPlus } from "lucide-react";
import { useState } from "react";

export default function CustomerPage() {
  const { isOpen: isAddOpen, onOpen: onAddOpen, setIsOpenAction: setIsAddOpen } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    setIsOpenAction: setIsDetailOpen,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    setIsOpenAction: setIsEditOpen,
  } = useDisclosure();
  const [pagination, setPagination] = useState({
    page: "1",
    perPage: "10",
    sortDirection: "desc",
    sortBy: "created_at",
  });
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  });

  const [filters, setFilters] = useState({
    provinceCode: "",
    cityCode: "",
  });
  const [selectedCustomerCode, setSelectedCustomerCode] = useState<string | null>(null);
  const [debouncedSearch, search, setSearch] = useDebounceState("", 900);
  const { data, loading, refetch } = useFetch<CustomerRes>(
    `${API_ENDPOINT}/customers?page=${pagination.page}&perPage=${pagination.perPage}&sortBy=${pagination.sortBy}&sortDirection=${pagination.sortDirection}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&search=${debouncedSearch}&provinceCode=${filters.provinceCode}&cityCode=${filters.cityCode}`
  );

  const { data: provinces } = useFetch<ProvinceRes>(`${API_ENDPOINT}/provinces/list`);
  const { data: cities } = useFetch<CitiesRes>(`${API_ENDPOINT}/cities/list`);

  const costumer = (data?.items ?? []).map((item) => ({
    id: item.code,
    name: item.name,
    group: item.group.name,
    area: item.area ?? "not found",
    province: item.province,
    city: item.city ?? "not found",
    address: <p className="truncate w-48">{item.address}</p>,
    status: item.status,
    target: item.target,
    achievement: item.achievement,
    percentage: `${normalizePercentage(Number(item.percentage))}%`,
    createdAt: `${displayDateTime(item.createdAt)}`,
    type: (
      <Badge variant="outline" className="flex items-center gap-1">
        {item.type === "EXISTING" ? (
          <>
            <p className="capitalize">{item.type.toLowerCase()}</p>
            <UserCheck size={16} className="text-green-600" />
          </>
        ) : (
          <>
            <p className="capitalize">{item.type.toLowerCase()}</p>
            <UserPlus size={16} className="text-blue-600" />
          </>
        )}
      </Badge>
    ),
    companyType: (
      <Badge variant="outline">
        <p>{item.companyType}</p>
        {item.companyType === "person" ? (
          <User className="w-4 h-4" />
        ) : (
          <Building2 className="w-4 h-4" />
        )}
      </Badge>
    ),
    action: (
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedCustomerCode(item.code);
            onDetailOpen();
          }}
        >
          <Eye />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedCustomerCode(item.code);
            onEditOpen();
          }}
        >
          <Pencil />
        </Button>
      </div>
    ),
  }));
  return (
    <DefaultLayout pageTitle="Customer" subTitle="Overview of your activities">
      <div className="flex flex-col gap-2 pb-8 pt-2  lg:justify-between">
        <Input
          placeholder="Search name customer.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full "
        />
        <div className="flex flex-col lg:flex-row gap-2 ">
          <div className=" w-full  grid  md:grid-cols-3 xl:flex gap-2">
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
            <ShadcnUiSelect
              value={filters.provinceCode}
              className="w-full"
              onChange={(val) => setFilters((prev) => ({ ...prev, provinceCode: val }))}
              options={[
                ...(provinces?.items ?? []).map((prov) => ({
                  label: prov.name,
                  value: prov.code,
                })),
              ]}
              placeholder="Select by province"
            />
            <ShadcnUiSelect
              value={filters.cityCode}
              onChange={(val) => setFilters((prev) => ({ ...prev, cityCode: val }))}
              options={[
                ...(cities?.items ?? []).map((city) => ({
                  label: city.name,
                  value: city.code,
                })),
              ]}
              className="w-full"
              placeholder="Filter by City"
            />
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
            <ShadcnUiSelect
              value={pagination.sortBy}
              onChange={(val) => setPagination((prev) => ({ ...prev, page: "1", sortBy: val }))}
              placeholder="Sort by"
              options={[
                {
                  label: "Created At",
                  value: "created_at",
                },
                {
                  label: "Name",
                  value: "name",
                },
              ]}
            />
          </div>
          <Button
            variant="default"
            onClick={onAddOpen}
            className="w-full md:w-auto flex items-center gap-2"
          >
            <Plus />
            <span className="hidden md:inline">Add Customer</span>
            <span className="md:hidden">Add</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <ShadcnTable
          rows={costumer}
          columns={[
            { key: "name", title: "Name" },
            { key: "type", title: "Type" },
            { key: "companyType", title: "Company Type" },
            { key: "group", title: "Group" },
            { key: "area", title: "Area" },
            { key: "province", title: "Province" },
            { key: "city", title: "City" },
            { key: "address", title: "Address" },
            { key: "status", title: "Status" },
            { key: "target", title: "Target" },
            { key: "achievement", title: "Achievement" },
            { key: "percentage", title: "Percentage" },
            { key: "createdAt", title: "Created At" },
            { key: "action", title: "Action" },
          ]}
          isLoading={loading}
          emptyStateMessage="not found"
        />
      </div>

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
      <AddCustomerModal isOpen={isAddOpen} setIsOpenAction={setIsAddOpen} refreshCb={refetch} />
      <DetailCustomerModal
        isOpen={isDetailOpen}
        setIsOpenAction={setIsDetailOpen}
        code={selectedCustomerCode ?? ""}
      />
      <EditCustomerModal
        isOpen={isEditOpen}
        setIsOpenAction={setIsEditOpen}
        code={selectedCustomerCode ?? ""}
        refreshCb={refetch}
      />
    </DefaultLayout>
  );
}
