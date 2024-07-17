import { useFetchBranchLocation } from "@/hooks/useFetchBranchLocation";
import { toTitleCase } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const { data } = useFetchBranchLocation();

  return (
    <header className="flex justify-center">
      <div className="p-4  flex max-w-[1200px] w-[1200px] justify-start bg-card rounded-md m-2 flex-col gap-2">
        <h1 className="text-4xl">Overview</h1>
        {data ? (
          <h2 className="text-foreground text-xl">
            {toTitleCase(data.address)}, {toTitleCase(data.city)}{" "}
            {toTitleCase(data.state)}
          </h2>
        ) : (
          <Skeleton className="w-full h-8 rounded-sm" />
        )}
      </div>
    </header>
  );
  // }
};

export default Header;
