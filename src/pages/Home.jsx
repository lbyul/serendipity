import Header from "./../components/Header/Header";
import Button from "./../components/Button/Button";
import CalendarIcon from "./../assets/calendar_icon.svg";
import DiaryList from "../components/DiaryList/DiaryList";
import Dropdown from "../components/Dropdown/Dropdown";
import { useState } from "react";

const Home = () => {
  const [sortType, setSortType] = useState("latest");

  const sortOptions = [
    { value: "latest", label: "최신 순" },
    { value: "oldest", label: "오래된 순" },
  ];

  const handleSortChange = (option) => {
    setSortType(option.value);
  };

  return (
    <section className="home">
      <Header
        title={"2025. 03"}
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
      <DiaryList />
    </section>
  );
};

export default Home;
