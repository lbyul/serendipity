import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from "@/App";
import Button from "@/components/Button/Button";
import CreateButton from "@/components/Button/CreateButton";
import Calendar from "@/components/Calendar/Calendar";
import Header from "@/components/Header/Header";
import MonthNavigator from "@/components/MonthNavigator/MonthNavigator";
import ListIcon from "@/assets/list_icon.svg";

const Home = () => {
  const nav = useNavigate();
  const { currentDate, changeDate } = useContext(DateContext);

  return (
    <div>
      <Header
        rightChild={<Button imageUrl={ListIcon} onClick={() => nav("/list")} />}
      />
      <MonthNavigator date={currentDate} onChangeDate={changeDate} />
      <Calendar date={currentDate} />
      <CreateButton />
    </div>
  );
};

export default Home;
