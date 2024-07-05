import CarInventory from "@/components/carInventory";
import ReservationCard from "@/components/reservationCard";
import Container from "@/components/ui/container";

const Home = () => {
  return (
    <Container className="flex justify-center items-center gap-8">
      <div>
        <CarInventory />
      </div>
      <div>
        <ReservationCard />
      </div>
    </Container>
  );
};

export default Home;
