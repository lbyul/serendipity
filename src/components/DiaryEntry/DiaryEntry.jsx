import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./DiaryEntry.css";
import { getStringedDate } from "../../util/get-stringed-date";
import EmotionSelector from "../Emotion/EmotionSelector";

const DiaryEntry = ({
  initData,
  onSubmit,
  isEditing = true,
  emotionId,
  createdDate,
  content,
}) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 1,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSelectEmotion = (emotionId) => {
    setInput({
      ...input,
      emotionId: emotionId,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="diary-entry">
      <section className="diary-emotion">
        {isEditing ? (
          <EmotionSelector
            selectedEmotion={input.emotionId}
            onSelectEmotion={onSelectEmotion}
            isReadOnly={false}
          />
        ) : (
          <EmotionSelector
            selectedEmotion={emotionId}
            onSelectEmotion={onSelectEmotion}
            isReadOnly={true}
          />
        )}
      </section>

      <section className="diary-date">
        {isEditing ? (
          <input
            name="createdDate"
            value={getStringedDate(input.createdDate)}
            onChange={onChangeInput}
            type="date"
          />
        ) : (
          <span>{getStringedDate(new Date(createdDate))}</span>
        )}
      </section>

      <section className="diary-content">
        {isEditing ? (
          <textarea
            name="content"
            value={input.content}
            onChange={onChangeInput}
            placeholder="오늘 하루는 어땠나요?"
          />
        ) : (
          <p>{content}</p>
        )}
      </section>

      {isEditing && onSubmit && (
        <section className="diary-submit-btn">
          <Button text={"작성완료"} onClick={onClickSubmitButton} />
        </section>
      )}
    </div>
  );
};

export default DiaryEntry;
