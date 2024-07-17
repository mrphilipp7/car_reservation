import { fetchBranchLocationByUserId } from "@/supabase/api";
import { useQuery } from "@tanstack/react-query";

export function useFetchBranchLocation() {
  const query = useQuery({
    queryKey: ["branch-location"],
    queryFn: fetchBranchLocationByUserId,
  });
  return query;
}
