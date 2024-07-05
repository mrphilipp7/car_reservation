import * as React from "react";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "./spinner";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { fetchReservationsOnDate } from "@/supabase/api";
import { TReservation } from "@/lib/types";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { formatTableReservationTime } from "@/lib/utils";

export interface IReservationCardProps {}

const CreateReservationBtn = () => {
  return (
    <Button asChild>
      <Link to="/app/reservation">Make Reservation</Link>
    </Button>
  );
};

// ------- TABLE COMPONENT AND DETAILS SET UP ------ //
export const columns: ColumnDef<TReservation>[] = [
  {
    accessorKey: "pickup_time",
    header: "Pick Up",
    cell: ({ row }) => (
      <div className="capitalize">
        {formatTableReservationTime(row.getValue("pickup_time"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`capitalize  ${
          row.getValue("status") === "completed" ? "text-green-500 " : ""
        }
        ${row.getValue("status") === "cancelled" ? "text-red-500 " : ""}
        `}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    id: "ReservationInfo",
    enableHiding: false,
    header: "Reservation Info",
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
              <Link to={`/app/car/${row.original.car_id}`}>
                View Reservation Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ReservationCard(props: IReservationCardProps) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isFetchingReservations, setIsFetchingReservations] =
    React.useState(false);
  const [reservationRows, setReservationRows] = React.useState<TReservation[]>(
    []
  );
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const handleFetchReservation = async (date: Date) => {
    if (date) {
      setDate(date);
      setIsFetchingReservations(true);
      const res: TReservation[] = await fetchReservationsOnDate(date);
      console.log(res);
      setReservationRows(res);
      setIsFetchingReservations(false);
    }
  };

  React.useEffect(() => {
    handleFetchReservation(new Date());
  }, []);

  // Use React Table hook with pagination settings
  const table = useReactTable({
    data: reservationRows,
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
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle>Reservations: {formatDate(date, false)}</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="w-[400px] h-[830px] flex flex-col">
          {/* ------ Date picker to view reservations in the given time ------ */}
          <header
            className="flex items-center py-4 gap-2"
            id="reservation-date"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                      if (e) handleFetchReservation(e);
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button
              disabled={isFetchingReservations}
              onClick={() => handleFetchReservation(date)}
            >
              {isFetchingReservations ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                "Search Date"
              )}
            </Button>
          </header>
          {/* ---------- TABLE -------  */}
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
                      {isFetchingReservations ? "Loading..." : "No results."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>{" "}
          </div>
          <footer className="flex items-center justify-between py-4">
            <div>
              Page {pageIndex + 1} of{" "}
              {Math.ceil(reservationRows.length / pageSize)}
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
      </CardContent>
    </Card>
  );
}
