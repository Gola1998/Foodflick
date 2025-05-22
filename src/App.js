import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//  ✅ createBrowserRouter will create routing configuration for us
//  ✅ RouterProvider actually provide this routing configuration to our app
import About from "./components/About";
import Contact from "./components/Contact";
import Grocery from "./components/Grocery";
import RestaurantMenu from "./components/RestaurantMenu";
// import Error from "./components/Error";


const Grocery = lazy(() => import("./components/Error"));


const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

//  ✅  here we are creating routing configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (<Suspense fallback={<h1>Loading.....</h1>}>
          <Grocery />
        </Suspense>)
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
