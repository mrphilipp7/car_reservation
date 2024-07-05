import Container from "@/components/ui/container";
import { fetchCarDetails } from "@/supabase/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CarInfoCard from "@/components/carInfoCard";

const CarInfo = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["car_details", id],
    queryFn: () => fetchCarDetails(id),
  });

  return (
    <Container className="flex justify-center items-center container">
      <CarInfoCard query={query} />
    </Container>
  );
};

export default CarInfo;
