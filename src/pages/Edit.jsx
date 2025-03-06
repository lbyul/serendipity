import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();

  return <>{params.id}번 입니다</>;
};

export default Edit;
