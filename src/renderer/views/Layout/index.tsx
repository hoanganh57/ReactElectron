import { Layout } from "antd";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "renderer/app/Navbar";

const AppLayout = () => {
  const location = useLocation();

  console.log("Location: ", location.pathname);
  return (
    <Layout>
      <Layout.Sider className="w-[40px] min-w-[40px] flex-[0]">
        <Navbar />
      </Layout.Sider>
      <Layout>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(AppLayout);
