import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "@/App";
import Button from "@/components/Button/Button";
import DiaryEntry from "@/components/DiaryEntry/DiaryEntry";
import Header from "@/components/Header/Header";
import useDiary from "@/hooks/useDiary";

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
