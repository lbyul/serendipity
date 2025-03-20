import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./DiaryEntry.css";
import { getStringedDate } from "../../util/get-stringed-date";
import EmotionSelector from "../Emotion/EmotionSelector";
import { getEmotionImage } from "../../util/get-emotion-image";

const DiaryEntry = ({ initData, onSubmit, isEditing = true }) => {
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
    <div className="editor">
      <section className="editor-emotion">
        {isEditing ? (
          <EmotionSelector
            selectedEmotion={input.emotionId}
            onSelectEmotion={onSelectEmotion}
          />
        ) : (
          <div>
            <img src={getEmotionImage(input.emotionId)} alt="" />
          </div>
        )}
      </section>

      <section className="editor-date">
        {isEditing ? (
          <input
            name="createdDate"
            value={getStringedDate(input.createdDate)}
            onChange={onChangeInput}
            type="date"
          />
        ) : (
          <span>{input.createdDate.toLocaleDateString()}</span>
        )}
      </section>

      <section className="editor-content">
        {isEditing ? (
          <textarea
            name="content"
            value={input.content}
            onChange={onChangeInput}
            placeholder="오늘 하루는 어땠나요?"
          />
        ) : (
          <p>{input.content}</p>
        )}
      </section>

      {isEditing && onSubmit && (
        <section className="editor-submit-btn">
          <Button text={"작성완료"} onClick={onClickSubmitButton} />
        </section>
      )}
    </div>
  );
};

export default DiaryEntry;
