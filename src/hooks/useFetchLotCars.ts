import { fetchLotTableData } from "@/supabase/api";
import { useQuery } from "@tanstack/react-query";

export function useFetchLotCars() {
  return useQuery({
    queryKey: ["LotTable"],
    queryFn: fetchLotTableData,
  });
}
