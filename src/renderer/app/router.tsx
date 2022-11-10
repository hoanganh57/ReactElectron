import { createMemoryRouter } from "react-router-dom";
import Home from "renderer/views/Home";
import Service from "renderer/views/Service";
import AppLayout from "renderer/views/Layout";
import AddService from "renderer/views/Service/components/AddService";
import Setting from "renderer/views/Home/components/Setting";
import ViewService from "renderer/views/Service/components/ViewService";

const HomeRouter = [
  {
    path: "setting",
    element: <Setting />,
  },
];

const ServiceRouter = [
  {
    path: "add",
    element: <AddService />,
  },
  {
    path: ":key",
    element: <ViewService />,
  },
];

const AppRouter = [
  {
    path: "",
    element: <Home />,
    children: HomeRouter,
  },
  {
    path: "service",
    element: <Service />,
    children: ServiceRouter,
  },
];

const Router = createMemoryRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: AppRouter,
    },
  ],
  {
    initialEntries: ["/"],
    initialIndex: 1,
  }
);

export default Router;
