import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "@/App";
import useDiary from "@/hooks/useDiary";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import DiaryEntry from "@/components/DiaryEntry/DiaryEntry";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

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
