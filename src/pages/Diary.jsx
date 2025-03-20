import { useParams, useNavigate, replace } from "react-router-dom";
import { useState, useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button/Button";
import Dropdown from "../components/Dropdown/Dropdown";
import Header from "../components/Header/Header";
import modalIcon from "../assets/modal_icon.svg";
import Modal from "../components/Modal/Modal";

const Diary = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { onDelete } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const dropdownOptions = [
    { value: "edit", label: "수정하기" },
    { value: "delete", label: "삭제하기" },
  ];

  const onChangeDropdown = (option) => {
    if (option.value === "delete") {
      setModalOpen(true);
    }
  };

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
            onChange={onChangeDropdown}
          />
        }
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
