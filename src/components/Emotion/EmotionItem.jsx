import "./EmotionItem.css";
import { getEmotionImage } from "../../util/get-emotion-image";
import { useState } from "react";

const EmotionItem = ({
  emotionId,
  emotionName,
  onClick,
  isSelected,
  showName = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickEmotion = () => {
    onClick(emotionId);
  };

  return (
    <li className="emotion-item">
      <button className="emotion-item-container">
        <img
          className={`emotion${emotionId} ${isSelected ? "selected" : ""}`}
          src={getEmotionImage(emotionId)}
          alt={`${emotionName} 이모티콘`}
          onClick={onClickEmotion}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </button>
      {showName && (isHovered || isSelected) && (
        <span className={`emotion${emotionId}-name`}>{emotionName}</span>
      )}
    </li>
  );
};

export default EmotionItem;
