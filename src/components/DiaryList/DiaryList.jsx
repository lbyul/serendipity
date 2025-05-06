import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import DiaryItem from "@/components/DiaryItem/DiaryItem";
import Clover from "@/assets/clover.png";
import "./DiaryList.css";

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
