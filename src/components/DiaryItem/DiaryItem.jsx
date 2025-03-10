import "./DiaryItem.css";
import { getEmotionImage } from "../../util/get-emotion-image";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate();

  return (
    <article className="diaryitem">
      <div
        className={`diaryitem-img diaryitem-img-${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}
      >
        <img src={getEmotionImage(emotionId)} alt="" />
      </div>

      <div className="diaryitem-info" onClick={() => nav(`/diary/${id}`)}>
        <span className="diaryitem-created-date">
          {new Date(createdDate).toLocaleDateString()}
        </span>
        <p className="diaryitem-content">{content}</p>
      </div>

      <div className="diaryitem-button">
        <Button
          type={"circle-small"}
          imageUrl={Clover}
          onClick={() => nav(`/edit/${id}`)}
        />
      </div>
    </article>
  );
};

export default DiaryItem;
