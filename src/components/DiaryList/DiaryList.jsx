import "./DiaryList.css";
import CreateButton from "@/components/Button/CreateButton";
import DiaryItem from "@/components/DiaryItem/DiaryItem";

const DiaryList = ({ data }) => {
  return (
    <div className="diarylist">
      <div className="diarylist-wrapper">
        {data.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
      <CreateButton />
    </div>
  );
};

export default DiaryList;
