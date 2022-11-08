import { Tabs } from "antd";
import React from "react";
import Icons from "./icons";
import "./style.scss";

const Navbar = () => {
  const items = [
    {
      label: (
        <span className="flex text-center gap-2">
          <Icons name="telegram" />
          Tab 1
        </span>
      ),
      key: "item-1",
    },
    { label: "Tab 2", key: "item-2" },
  ];
  return (
    <div className="tabs-container">
      <Tabs
        items={items}
        type="card"
        size="small"
        tabBarStyle={{ marginBottom: 0, padding: "0 5px" }}
      />
    </div>
  );
};

export default React.memo(Navbar);
