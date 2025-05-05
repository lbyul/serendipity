import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import ListIcon from "../assets/list_icon.svg";
import { useNavigate } from "react-router-dom";
import MonthNavigator from "../components/MonthNavigator/MonthNavigator";
import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import Clover from "../assets/clover.png";

const CalendarView = () => {
  const nav = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div>
      <Header
        rightChild={<Button imageUrl={ListIcon} onClick={() => nav("/")} />}
      />
      <MonthNavigator date={currentDate} onChangeDate={changeDate} />
      <Calendar date={currentDate} />
      <div className="diarylist-button">
        <Button type={"circle"} imageUrl={Clover} onClick={() => nav(`/new`)} />
      </div>
    </div>
  );
};

export default CalendarView;
