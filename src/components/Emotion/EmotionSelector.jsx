import "./EmotionSelector.css";
import { useState } from "react";
import EmotionItem from "./EmotionItem";
import Button from "../Button/Button";
import Clover from "../../assets/clover.png";
import EmotionModal from "./EmotionModal";

const EmotionSelector = ({
  selectedEmotion,
  onSelectEmotion,
  isReadOnly = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (isReadOnly) return;
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="emotion-selector">
      {selectedEmotion ? (
        <div className="emotion-selector-container">
          <ul className="emotion-selector-list">
            <EmotionItem
              emotionId={selectedEmotion}
              isSelected={true}
              onClick={() => openModal()}
              showName={false}
              isReadOnly={isReadOnly}
            />
          </ul>
        </div>
      ) : (
        <div className="emotion-selector-empty">
          <Button
            type={"circle-big"}
            imageUrl={Clover}
            onClick={openModal}
            disabled={isReadOnly}
          />
        </div>
      )}
      <EmotionModal
        isOpen={modalOpen}
        onClose={closeModal}
        selectedEmotion={selectedEmotion}
        onSelectEmotion={onSelectEmotion}
      />
    </div>
  );
};

export default EmotionSelector;
