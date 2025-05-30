import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from "@/App";
import Button from "@/components/Button/Button";
import CreateButton from "@/components/Button/CreateButton";
import Calendar from "@/components/Calendar/Calendar";
import Dropdown from "@/components/Dropdown/Dropdown";
import Header from "@/components/Header/Header";
import MonthNavigator from "@/components/MonthNavigator/MonthNavigator";
import ListIcon from "@/assets/list_icon.svg";

const Home = () => {
  const nav = useNavigate();
  const { currentDate, changeDate } = useContext(DateContext);

  const sortOptions = [
    { value: "latest", label: "일기", onClick: () => nav("/") },
    { value: "oldest", label: "영화", onClick: () => nav("/movie") },
  ];

  const selectedOption = sortOptions[0];

  return (
    <div>
      <Header
        rightChild={<Button imageUrl={ListIcon} onClick={() => nav("/list")} />}
        leftChild={
          <Dropdown
            options={sortOptions}
            arrow={true}
            buttonType="select"
            align="left"
            selectedOption={selectedOption}
          />
        }
      />
      <MonthNavigator date={currentDate} onChangeDate={changeDate} />
      <Calendar date={currentDate} />
      <CreateButton />
    </div>
  );
};

export default Home;
