import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const RootLayout = () => {
  return <Outlet />;
};
