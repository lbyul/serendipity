import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Header from "@/components/Header/Header";
import AddIcon from "@/assets/add_icon.svg";

const Movie = () => {
  const nav = useNavigate();

  const sortOptions = [
    { value: "latest", label: "일기", onClick: () => nav("/") },
    { value: "oldest", label: "영화", onClick: () => nav("/movie") },
  ];

  const selectedOption = sortOptions[1];

  return (
    <div>
      <Header
        rightChild={<Button imageUrl={AddIcon} />}
        leftChild={
          <Dropdown
            options={sortOptions}
            arrow={true}
            buttonType="select"
            align="left"
            selectedOption={selectedOption}
          />
        }
      />
    </div>
  );
};

export default Movie;
