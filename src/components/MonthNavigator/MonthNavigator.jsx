import "./MonthNavigator.css";
import Button from "@/components/Button/Button";

const MonthNavigator = ({ date, onChangeDate }) => {
  const onIncreaseMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1);
    if (onChangeDate) {
      onChangeDate(newDate);
    }
  };

  const onDecreaseMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1);
    if (onChangeDate) {
      onChangeDate(newDate);
    }
  };

  return (
    <div>
      <div className="month-navigator">
        <Button arrow="true" arrowDirection="left" onClick={onDecreaseMonth} />
        <h1>{`${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`}</h1>
        <Button arrow="true" arrowDirection="right" onClick={onIncreaseMonth} />
      </div>
    </div>
  );
};

export default MonthNavigator;
