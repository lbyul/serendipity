import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from "@/App";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import MonthNavigator from "@/components/MonthNavigator/MonthNavigator";
import Calendar from "@/components/Calendar/Calendar";
import Clover from "@/assets/clover.png";
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
      <div className="create-button">
        <Button type={"circle"} imageUrl={Clover} onClick={() => nav(`/new`)} />
      </div>
    </div>
  );
};

export default Home;
