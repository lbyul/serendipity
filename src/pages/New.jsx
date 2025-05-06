import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "@/App";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import DiaryEntry from "@/components/DiaryEntry/DiaryEntry";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  const location = useLocation();

  const initialData = location.state?.selectedDate
    ? {
        createdDate: location.state.selectedDate,
        emotionId: 1,
        content: "",
      }
    : null;

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <section>
      <Header leftChild={<Button text={"<"} onClick={() => nav(-1)} />} />
      <DiaryEntry onSubmit={onSubmit} initData={initialData} />
    </section>
  );
};

export default New;
