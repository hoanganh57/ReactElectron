import TelegramIcon from "../../../../assets/icons/telegram.svg";

const icons = [
  {
    name: "telegram",
    icon: (
      <img src={TelegramIcon} alt="telegram" className="w-[24px] h-[24px]" />
    ),
  },
];

interface Props {
  name: string;
}

const Icons = ({ name }: Props) => {
  const findIcon = icons.find((el) => el.name === name);
  if (!findIcon) return null;
  return findIcon.icon;
};

export default Icons;
