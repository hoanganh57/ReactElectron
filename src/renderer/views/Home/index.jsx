import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  if (location.pathname === "/") return <>Home</>;
  return <Outlet />;
};

export default React.memo(Home);
