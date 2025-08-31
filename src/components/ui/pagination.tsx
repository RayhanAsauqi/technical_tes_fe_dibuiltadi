import { Button } from "./button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Skeleton } from "./skeleton";

export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
  isLoading?: boolean;
};

export function Pagination({
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 20, 50, 100],
  isLoading = false,
}: PaginationProps) {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col space-y-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:px-2">
          <Skeleton className="h-4 w-40 sm:w-48" />
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16 sm:w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-12 sm:w-28" />
              <div className="flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-9 sm:h-8 sm:w-8" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col space-y-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:px-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">Showing </span>
            {startItem}-{endItem} of {total}
            <span className="hidden sm:inline"> entries</span>
          </p>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          <div className="flex items-center justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-medium">
              <span className="sm:hidden">Per page</span>
              <span className="hidden sm:inline">Rows per page</span>
            </p>
            <Select
              value={perPage.toString()}
              onValueChange={(value) => onPerPageChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {perPageOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between sm:justify-start sm:space-x-2">
            <p className="text-sm font-medium">
              <span className="sm:hidden">
                {currentPage}/{lastPage}
              </span>
              <span className="hidden sm:inline">
                Page {currentPage} of {lastPage}
              </span>
            </p>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0 sm:h-8 sm:w-8"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0 sm:h-8 sm:w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="h-9 w-9 p-0 sm:h-8 sm:w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => onPageChange(lastPage)}
                disabled={currentPage === lastPage}
                className="h-9 w-9 p-0 sm:h-8 sm:w-8"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
