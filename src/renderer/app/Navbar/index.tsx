import { Tabs } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "renderer/components/Icon";
import "./style.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState("home");
  const [items, setItems] = useState([
    {
      label: (
        <span className="flex items-center justify-center">
          <Icon name="telegram" />
        </span>
      ),
      key: "telegram",
    },
    {
      label: (
        <span className="flex items-center">
          <Icon name="messenger" />
        </span>
      ),
      key: "messenger",
    },
  ]);

  return (
    <div className="tabs-container">
      <Tabs
        items={items}
        type="card"
        size="small"
        tabPosition="left"
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          navigate(`/service/${key}`);
        }}
        tabBarExtraContent={{
          left: (
            <span className="flex justify-center items-center h-[40px] w-[40px]">
              <Icon name="logo" />
            </span>
          ),
          right: (
            <>
              <span
                className={`flex justify-center items-center h-[40px] w-[40px] cursor-pointer
                ${activeKey === "add" && "active"}`}
                onClick={() => {
                  setActiveKey("add");
                  navigate("/service/add");
                }}
              >
                <Icon name="add" size="small" />
              </span>
              <span
                className={`flex justify-center items-center h-[40px] w-[40px] cursor-pointer
                ${activeKey === "setting" && "active"}`}
                onClick={() => {
                  setActiveKey("setting");
                  navigate("/setting");
                }}
              >
                <Icon name="setting" size="small" />
              </span>
            </>
          ),
        }}
      />
    </div>
  );
};

export default React.memo(Navbar);
