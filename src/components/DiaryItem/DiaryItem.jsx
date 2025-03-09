import "./DiaryItem.css";
import { getEmotionImage } from "../../util/get-emotion-image";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";

const DiaryItem = () => {
  return (
    <article className="diaryitem">
      <div className="diaryitem-img">
        <img src={getEmotionImage(1)} alt="" />
      </div>

      <div className="diaryitem-info">
        <span className="diaryitem-created-date">2023.03.09</span>
        <p className="diaryitem-content">
          안녕! 네가 누구든 어떻게 살아왔든 각자의 삶에서 치열하게 투쟁하는 너의
          오늘을 내가 사랑해
        </p>
      </div>

      <div className="diaryitem-button">
        <Button type={"circle-small"} imageUrl={Clover} />
      </div>
    </article>
  );
};

export default DiaryItem;
