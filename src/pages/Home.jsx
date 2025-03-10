import Header from "./../components/Header/Header";
import Button from "./../components/Button/Button";
import CalendarIcon from "./../assets/calendar_icon.svg";
import DiaryList from "../components/DiaryList/DiaryList";
import Dropdown from "../components/Dropdown/Dropdown";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

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
  const [sortType, setSortType] = useState("latest");
  const [pivotDate, setPivoDate] = useState(new Date());

  const sortOptions = [
    { value: "latest", label: "최신 순" },
    { value: "oldest", label: "오래된 순" },
  ];

  const handleSortChange = (option) => {
    setSortType(option.value);
  };

  const onIncreaseMonth = () => {
    setPivoDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivoDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const monthlyData = getMonthlyData(pivotDate, data);

  return (
    <section className="home">
      <Header
        title={`${pivotDate.getFullYear()}. ${String(
          pivotDate.getMonth() + 1
        ).padStart(2, "0")}`}
        titleLeft={
          <Button
            arrow="true"
            arrowDirection="left"
            onClick={onDecreaseMonth}
          />
        }
        titleRight={
          <Button
            arrow="true"
            arrowDirection="right"
            onClick={onIncreaseMonth}
          />
        }
        leftChild={
          <Dropdown
            options={sortOptions}
            onChange={handleSortChange}
            arrow={true}
            buttonType="select"
            align="left"
          />
        }
        rightChild={<Button imageUrl={CalendarIcon} />}
      />
      <DiaryList data={monthlyData} />
    </section>
  );
};

export default Home;
