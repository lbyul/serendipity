import "./DiaryEntry.css";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import EmotionSelector from "@/components/Emotion/EmotionSelector";
import { getStringedDate } from "@/utils/get-stringed-date";

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
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectEmotion = (emotionId) => {
    setInput({
      ...input,
      emotionId: emotionId,
    });
  };

  const onSelectDate = (date) => {
    setInput({
      ...input,
      createdDate: date,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  const toggleDatePicker = () => {
    setDatePickerOpen(!datePickerOpen);
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
          <>
            <button className="date-button" onClick={toggleDatePicker}>
              {getStringedDate(input.createdDate)} <span>&gt;</span>
            </button>
            <DatePicker
              selectedDate={input.createdDate}
              onSelectDate={onSelectDate}
              isOpen={datePickerOpen}
              onClose={() => setDatePickerOpen(false)}
            />
          </>
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
