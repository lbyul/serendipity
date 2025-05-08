import "./Button.css";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Clover from "@/assets/clover.png";

const CreateButton = () => {
  const nav = useNavigate();

  return (
    <div className="create-button">
      <Button type={"circle"} imageUrl={Clover} onClick={() => nav(`/new`)} />
    </div>
  );
};

export default CreateButton;
