import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../ui/table";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import { TriangleAlert } from "lucide-react";

export type ShadcnTableColumn = {
  key: string
  title: string
}[]

export type ShadcnTableRow<T = Record<string, any>> = {
  id: number | string
} & T

export type ShadcnTableProps<T = Record<string, any>> = {
  columns: ShadcnTableColumn
  rows: ShadcnTableRow<T>[]
  isLoading?: boolean
  isError?: boolean
  errorMessages?: string
  refreshCb?: () => void
  emptyStateMessage?: string
}

function RenderCell<T extends Record<string, any>>(column: ShadcnTableColumn[number], row: ShadcnTableRow<T>) {
  const cell = row[column.key]
  if (typeof cell === "function") {
    return cell(row)
  }
  return cell
}

export default function ShadcnTable<T = Record<string, any>>(props: ShadcnTableProps<T>) {
  if (!props.isLoading && props.isError) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-red-50 p-3">
            <TriangleAlert className="h-8 w-8 text-red-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
            <p className="text-sm text-gray-500 mt-1">
              {props.errorMessages || "Unable to load data. Please try again."}
            </p>
          </div>
          {props.refreshCb && (
            <Button onClick={props.refreshCb} className="mt-2">
              Try Again
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (props.isLoading) {
    return (
      <div className="w-full">
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {props.columns.map((column) => (
                  <TableCell key={column.key} className="font-semibold text-muted-foreground bg-muted/50">
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx} className="hover:bg-transparent">
                  {props.columns.map((column) => (
                    <TableCell key={column.key}>
                      <Skeleton className="h-6 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  if (!props.rows || props.rows.length === 0) {
    return (
      <div className="w-full">
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {props.columns.map((column) => (
                  <TableCell key={column.key} className="font-semibold text-muted-foreground bg-muted/50">
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={props.columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-muted-foreground">{props.emptyStateMessage || "No data available"}</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              {props.columns.map((column) => (
                <TableCell
                  key={column.key}
                  className="font-semibold text-muted-foreground bg-muted/50 first:rounded-tl-lg last:rounded-tr-lg"
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-muted/50 transition-colors">
                {props.columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`${index === props.rows.length - 1 ? "first:rounded-bl-lg last:rounded-br-lg" : ""}`}
                  >
                    {RenderCell(column, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
