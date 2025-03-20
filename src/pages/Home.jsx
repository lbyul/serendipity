import Header from "./../components/Header/Header";
import Button from "./../components/Button/Button";
import CalendarIcon from "./../assets/calendar_icon.svg";
import DiaryList from "../components/DiaryList/DiaryList";
import Dropdown from "../components/Dropdown/Dropdown";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import MonthNavigator from "../components/MonthNavigator/MonthNavigator";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivoDate] = useState(new Date());
  const [sortType, setSortType] = useState("latest");
  const nav = useNavigate();

  const changeDate = (newDate) => {
    setPivoDate(newDate);
  };

  const monthlyData = getMonthlyData(pivotDate, data);

  const sortOptions = [
    { value: "latest", label: "최신 순" },
    { value: "oldest", label: "오래된 순" },
  ];

  const onChangeSortType = (option) => {
    setSortType(option.value);
  };

  const sortedMonthlyData = monthlyData.toSorted((a, b) => {
    if (sortType === "oldest") {
      return Number(a.createdDate) - Number(b.createdDate);
    } else {
      return Number(b.createdDate) - Number(a.createdDate);
    }
  });

  return (
    <section className="home">
      <Header
        title={<MonthNavigator date={pivotDate} onChangeDate={changeDate} />}
        leftChild={
          <Dropdown
            options={sortOptions}
            onChange={onChangeSortType}
            arrow={true}
            buttonType="select"
            align="left"
          />
        }
        rightChild={
          <Button imageUrl={CalendarIcon} onClick={() => nav("/calendar")} />
        }
      />
      <DiaryList data={sortedMonthlyData} />
    </section>
  );
};

export default Home;
