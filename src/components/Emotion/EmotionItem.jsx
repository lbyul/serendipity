import "./EmotionItem.css";
import { getEmotionImage } from "../../util/get-emotion-image";
import { useState } from "react";

const EmotionItem = ({
  emotionId,
  emotionName,
  onClick,
  isSelected,
  showName = true,
  isReadOnly = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    if (isReadOnly) return;
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickEmotion = () => {
    if (isReadOnly) return;
    onClick(emotionId);
  };

  return (
    <li className="emotion-item">
      <div className={`emotion-item-container ${isReadOnly ? "readonly" : ""}`}>
        <img
          className={`emotion${emotionId} ${isSelected ? "selected" : ""} ${
            isReadOnly ? "readonly" : ""
          }`}
          src={getEmotionImage(emotionId)}
          onClick={onClickEmotion}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
      {showName && (isHovered || isSelected) && (
        <span className={`emotion${emotionId}-name`}>{emotionName}</span>
      )}
    </li>
  );
};

export default EmotionItem;
