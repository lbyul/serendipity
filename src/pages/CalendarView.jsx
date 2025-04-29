import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import ListIcon from "../assets/list_icon.svg";
import { useNavigate } from "react-router-dom";
import MonthNavigator from "../components/MonthNavigator/MonthNavigator";
import { useState } from "react";
import Calendar from "../components/Calendar/Calendar";

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
      <Calendar />
    </div>
  );
};

export default CalendarView;
