import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import DiaryEntry from "../components/DiaryEntry/DiaryEntry";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <section>
      <Header leftChild={<Button text={"<"} onClick={() => nav(-1)} />} />
      <DiaryEntry onSubmit={onSubmit} />
    </section>
  );
};

export default New;
