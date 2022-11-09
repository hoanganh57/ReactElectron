import { Tabs } from "antd";
import React from "react";
import ListIcon from "renderer/utils/ListIcons";
import "./style.scss";

interface Props {
  name: string;
}

const Icon = ({ name }: Props) => {
  const findIcon = ListIcon.find((el: any) => el.name === name);
  if (!findIcon) return null;
  return (
    <img
      src={findIcon.icon}
      alt={findIcon.name}
      className="w-[20px] h-[20px]"
    />
  );
};

const Navbar = () => {
  const items = [
    {
      label: (
        <span className="flex gap-2 text-center">
          <Icon name="telegram" />
          <span className="">Telegram</span>
        </span>
      ),
      key: "telegram",
    },
    {
      label: (
        <span className="flex gap-2 text-center">
          <Icon name="messenger" />
          <span className="">Messenger</span>
        </span>
      ),
      key: "messenger",
    },
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
