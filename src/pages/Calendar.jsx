import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import ListIcon from "../assets/list_icon.svg";
import { useNavigate } from "react-router-dom";
import MonthNavigator from "../components/MonthNavigator/MonthNavigator";
import { useState } from "react";

const Calendar = () => {
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
    </div>
  );
};

export default Calendar;
