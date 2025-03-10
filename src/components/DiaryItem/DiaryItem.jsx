import "./DiaryItem.css";
import { getEmotionImage } from "../../util/get-emotion-image";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  return (
    <article className="diaryitem">
      <div className={`diaryitem-img diaryitem-img-${emotionId}`}>
        <img src={getEmotionImage(emotionId)} alt="" />
      </div>

      <div className="diaryitem-info">
        <span className="diaryitem-created-date">
          {new Date(createdDate).toLocaleDateString()}
        </span>
        <p className="diaryitem-content">{content}</p>
      </div>

      <div className="diaryitem-button">
        <Button type={"circle-small"} imageUrl={Clover} />
      </div>
    </article>
  );
};

export default DiaryItem;
