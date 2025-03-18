import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Editor.css";
import { getStringedDate } from "../../util/get-stringed-date";
import EmotionSelector from "../Emotion/EmotionSelector";

const Editor = ({ initData, onSubmit }) => {
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
        <EmotionSelector
          selectedEmotion={input.emotionId}
          onSelectEmotion={onSelectEmotion}
        />
      </section>

      <section className="editor-date">
        <input
          name="createdDate"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
          type="date"
        />
      </section>

      <section className="editor-content">
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘 하루는 어땠나요?"
        />
      </section>

      <section className="editor-submit-btn">
        <Button text={"작성완료"} onClick={onClickSubmitButton} />
      </section>
    </div>
  );
};

export default Editor;
