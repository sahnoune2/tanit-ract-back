import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Carousele } from "./components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Contact } from "./components/Contact";
import Offers from "./components/Offers";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        { path: "/", element: <Carousele /> },
        { path: "/login", element: <Login /> },
        { path: "/signup" , element: <Signup/>},
        {  path: "/contact" , element: <Contact/>},
        {  path: "/offers"  , element: <Offers/>},
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
