import "./DiaryList.css";
import DiaryItem from "../DiaryItem/DiaryItem";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";

const DiaryList = () => {
  return (
    <div className="diarylist">
      <div className="diarylist-wrapper">
        <DiaryItem />
      </div>

      <div className="diarylist-button">
        <Button type={"circle"} imageUrl={Clover} />
      </div>
    </div>
  );
};

export default DiaryList;
