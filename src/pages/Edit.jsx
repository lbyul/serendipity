import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import DiaryEntry from "../components/DiaryEntry/DiaryEntry";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id, data]);

  const onSubmit = (input) => {
    onUpdate(
      params.id,
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    );
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header leftChild={<Button text={"<"} onClick={() => nav(-1)} />} />
      <DiaryEntry initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
