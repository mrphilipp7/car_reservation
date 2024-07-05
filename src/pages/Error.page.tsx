import Container from "@/components/ui/container";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

const Error = () => {
  const error = useRouteError();
  const typedError = error as RouteError;

  useEffect(() => {
    console.error(typedError.message || "Unknown error message");
  }, []);

  return (
    <>
      <Container className="flex justify-center items-center flex-col gap-2">
        <p className="text-6xl">{typedError.status}</p>
        <p className="text-4xl">{typedError.statusText}</p>
      </Container>
    </>
  );
};

export default Error;
