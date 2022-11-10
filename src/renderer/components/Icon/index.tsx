import React from "react";
import ListIcon from "./ListIcons";

interface Props {
  name?: string;
  size?: string;
}

const defaultProps: Props = {
  name: "",
  size: "default",
};

const Icon = ({ name, size }: Props) => {
  const findIcon = ListIcon.find((el: any) => el.name === name);
  if (!findIcon) return null;
  let classIcon = "";
  if (size === "small") classIcon = "w-[18px] h-[18px]";
  else classIcon = "w-[24px] h-[24px]";
  return <img src={findIcon.icon} alt={findIcon.name} className={classIcon} />;
};

Icon.defaultProps = defaultProps;

export default React.memo(Icon);
