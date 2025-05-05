import "./DiaryList.css";
import DiaryItem from "../DiaryItem/DiaryItem";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  return (
    <div className="diarylist">
      <div className="diarylist-wrapper">
        {data.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>

      <div className="create-button">
        <Button type={"circle"} imageUrl={Clover} onClick={() => nav(`/new`)} />
      </div>
    </div>
  );
};

export default DiaryList;
