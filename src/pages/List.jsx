import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext, DateContext } from "@/App";
import Header from "@/components/Header/Header";
import MonthNavigator from "@/components/MonthNavigator/MonthNavigator";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import DiaryList from "@/components/DiaryList/DiaryList";
import CalendarIcon from "@/assets/calendar_icon.svg";

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

const List = () => {
  const data = useContext(DiaryStateContext);
  const { currentDate, changeDate } = useContext(DateContext);
  const [sortType, setSortType] = useState("latest");
  const nav = useNavigate();

  const monthlyData = getMonthlyData(currentDate, data);

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
        title={<MonthNavigator date={currentDate} onChangeDate={changeDate} />}
        leftChild={
          <Dropdown
            options={sortOptions}
            onChange={onChangeSortType}
            arrow={true}
            buttonType="select"
            align="left"
          />
        }
        rightChild={<Button imageUrl={CalendarIcon} onClick={() => nav("/")} />}
      />
      <DiaryList data={sortedMonthlyData} />
    </section>
  );
};

export default List;
