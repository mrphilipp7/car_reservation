import { Car } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { numberWithCommas } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Skeleton } from "./ui/skeleton";
import { CircleXIcon } from "lucide-react";

export interface ICarInfoCardProps {
  query: UseQueryResult<PostgrestSingleResponse<any[]> | undefined, Error>;
}

export default function CarInfoCard(props: ICarInfoCardProps) {
  // ----- Handle the loading state of the query ----- //
  if (props.query.isLoading) {
    return (
      <Card className="w-96 h-[300px]">
        <CardHeader>
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-6" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-40" />
        </CardContent>
      </Card>
    );
  }

  // ----- Handle any errors in query ----- //
  if (props.query.isError) {
    return (
      <Card className="w-96 h-[300px]">
        <CardContent className="flex justify-center items-center h-full space-x-2">
          <CircleXIcon />
          <p>ERROR</p>
        </CardContent>
      </Card>
    );
  }

  // ----- Main display of the query data ----- //
  if (props.query.data && props.query.data.data) {
    const car = (props.query.data.data as Car[])[0];
    return (
      <>
        <Card className="w-96 h-[300px]">
          <CardHeader>
            <CardTitle>
              {car.year} {car.make} {car.model}
            </CardTitle>
            <CardDescription>ID: {car.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <p>Color:</p>
              <p>{car.color.toLowerCase()}</p>
            </div>
            <div className="flex justify-between">
              <p>License: </p>
              <p>{car.license_num.toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p>Milage: </p>
              <p>{numberWithCommas(parseInt(car.mileage))}</p>
            </div>
            <div className="flex justify-between">
              <p>Vehicle Type: </p>
              <p>{car.vec_type.toLowerCase()}</p>
            </div>
            <div className="flex justify-between">
              <p>VIN: </p>
              <p>{car.vim}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>
              IN SERVICE:{" "}
              <span
                className={`${
                  car.in_service ? "text-green-500" : "text-red-500"
                }`}
              >
                {car.in_service ? "YES" : "NO"}
              </span>
            </p>
          </CardFooter>
        </Card>
      </>
    );
  }
}
