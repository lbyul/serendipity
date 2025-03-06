import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();

  return <>{params.id}번 입니다</>;
};

export default Diary;
