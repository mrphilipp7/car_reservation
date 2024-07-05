import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetchLotCars } from "@/hooks/useFetchLotCars";
import { formatDate } from "@/lib/utils";

export default function CarInventory() {
  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Cars on lot</CardTitle>
        <CardDescription>{formatDate(new Date())} </CardDescription>
      </CardHeader>
      <CardContent>
        <CarInventoryTable />
      </CardContent>
    </Card>
  );
}

// ------ COMPONENT FOR DATA TABLE ----- //
export type LotInventory = {
  id: string;
  year: number;
  make: string;
  model: string;
};

export const columns: ColumnDef<LotInventory>[] = [
  {
    accessorKey: "make",
    header: "make",
    cell: ({ row }) => <div className="capitalize">{row.getValue("make")}</div>,
  },
  {
    accessorKey: "model",
    header: "model",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("model")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: "year",
    cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>,
  },
  {
    id: "CarInfo",
    enableHiding: false,
    header: "Car Info",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Details</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/app/car/${row.original.id}`}>View Car Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CarInventoryTable() {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const debouncedGlobalFilter = useDebounce(globalFilter, 200); // Debounce input with 200ms delay
  const [lotRowData, setLotRowData] = React.useState<LotInventory[]>([]);

  const query = useFetchLotCars();

  React.useEffect(() => {
    if (query.data?.data) {
      const transformedData: LotInventory[] = query.data.data.map((item) => ({
        id: item.id,
        year: item.year, // Transform 'year' to 'Year'
        make: item.make, // Transform 'make' to 'Make'
        model: item.model, // Transform 'model' to 'Model'
      }));
      setLotRowData(transformedData);
    }
  }, [query.data]);

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  // Filter data based on the global filter input
  const filteredData = React.useMemo(() => {
    if (!debouncedGlobalFilter) return lotRowData;
    const lowerCaseFilter = debouncedGlobalFilter.toLowerCase();
    return lotRowData.filter(
      ({ make, model, year }) =>
        make.toLowerCase().includes(lowerCaseFilter) ||
        model.toLowerCase().includes(lowerCaseFilter) ||
        year.toString().includes(lowerCaseFilter)
    );
  }, [debouncedGlobalFilter, lotRowData]);

  // Use React Table hook with pagination settings
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Set the pagination state
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
  });

  return (
    <section className="w-[750px] h-[830px] flex flex-col">
      <header className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search Lot..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </header>
      <div className="flex-grow overflow-hidden ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-start">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={`h-24 text-center `}
                >
                  {query.isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <footer className="flex items-center justify-between py-4">
        <div>
          Page {pageIndex + 1} of {Math.ceil(filteredData.length / pageSize)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </footer>
    </section>
  );
}
