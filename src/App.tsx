import Error from "./pages/Error.page";
import Login from "./pages/Login.page";
import CarInfo from "./pages/CarInfo.page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider";
import { AppLayout, RootLayout } from "./components/layouts";
import Home from "./pages/Home.page";
import { AppLoader } from "./lib/loaders";
import Reservation from "./pages/Reservation.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/app",
        element: <AppLayout />,
        loader: AppLoader,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "car/:id",
            element: <CarInfo />,
          },
          {
            path: "reservation",
            element: <Reservation />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
