import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "@/App";
import useDiary from "@/hooks/useDiary";
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import DiaryEntry from "@/components/DiaryEntry/DiaryEntry";
import Modal from "@/components/Modal/Modal";
import modalIcon from "@/assets/modal_icon.svg";

const Diary = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { onDelete } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중..!</div>;
  }

  const { emotionId, createdDate, content } = curDiaryItem;

  const dropdownOptions = [
    {
      value: "edit",
      label: "수정하기",
      onClick: () => nav(`/edit/${params.id}`),
    },
    { value: "delete", label: "삭제하기", onClick: () => setModalOpen(true) },
  ];

  const onClickDelet = () => {
    onDelete(params.id);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        leftChild={<Button text={"<"} onClick={() => nav(-1)} />}
        rightChild={
          <Dropdown
            options={dropdownOptions}
            buttonType="small"
            icon={modalIcon}
            align="right"
          />
        }
      />

      <DiaryEntry
        emotionId={emotionId}
        createdDate={createdDate}
        content={content}
        isEditing={false}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={`정말 삭제하시나요?
      삭제한 글은 복원할 수 없어요.`}
        confirmText="삭제"
        confirmType="delete"
        onConfirm={onClickDelet}
      />
    </div>
  );
};

export default Diary;
