import { useNavigate } from "react-router-dom";
import useCalendar from "@/hooks/useCalendar";
import useDiaryEntries from "@/hooks/useDiaryEntries";
import { getEmotionImage } from "@/utils/get-emotion-image";
import "./Calendar.css";

const Calendar = ({ date = new Date() }) => {
  const nav = useNavigate();
  const { getDiaryEntry } = useDiaryEntries();
  const calendar = useCalendar(date, getDiaryEntry);

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDayClick = (day) => {
    if (!day || !day.isCurrentMonth || day.isFuture) return;

    if (day.hasEntry) {
      nav(`/diary/${day.hasEntry.id}`);
    } else {
      nav("/new", {
        state: { selectedDate: day.date },
      });
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-container">
        {/* 요일 헤더 */}
        <div className="calendar-header">
          {weeks.map((day, index) => (
            <div
              key={index}
              className={`calendar-week ${index === 0 ? "sun" : ""}${
                index === 6 ? "sat" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 달력 날짜 */}
        <div className="calendar-body">
          {calendar.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${
                !day.isCurrentMonth ? "other-month" : ""
              } ${day.date.getDay() === 0 ? "sun" : ""} ${
                day.date.getDay() === 6 ? "sat" : ""
              } ${day.isToday ? "current-day" : ""} ${
                day.isFuture ? "future-date" : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              <div className="calendar-date">{day.date.getDate()}</div>
              {day.hasEntry && (
                <div className="calendar-entry">
                  <img
                    src={getEmotionImage(day.hasEntry.emotionId)}
                    alt="emotion"
                    className="emotion-icon"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
