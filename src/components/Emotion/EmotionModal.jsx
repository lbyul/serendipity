import "./EmotionModal.css";
import EmotionItem from "./EmotionItem";
import { useRef } from "react";
import { emotionList } from "../../utils/constants";
import useEscapeKey from "../../hooks/useEscapeKey";
import useOutsideClick from "../../hooks/useOutsideClick";

const EmotionModal = ({
  isOpen,
  onClose,
  selectedEmotion,
  onSelectEmotion,
}) => {
  const modalRef = useRef(null);
  useEscapeKey(isOpen, onClose);
  useOutsideClick(modalRef, isOpen, onClose);

  if (!isOpen) return null;

  const onClickEmotionSelect = (emotionId) => {
    onSelectEmotion(emotionId);
    onClose();
  };

  return (
    <aside className="emotion-modal-overlay">
      <div className="emotion-modal" ref={modalRef}>
        <button className="emotion-modal-close-btn" onClick={onClose}></button>
        <div className="emotion-modal-content">
          <span className="date">{new Date().toLocaleDateString()}</span>
          <p className="text">오늘 하루는 어땠나요?</p>
        </div>

        <ul className="emotion">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              isSelected={selectedEmotion === item.emotionId}
              onClick={onClickEmotionSelect}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default EmotionModal;
