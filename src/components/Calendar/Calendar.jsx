import { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({ date = new Date() }) => {
  const [calendar, setCalendar] = useState([]);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  // 현재 날짜 (오늘)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 현재 년월에 맞는 캘린더 데이터 생성
  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // 현재 월의 첫 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 첫 날의 요일 (0: 일요일, 1: 월요일, ...)
    const firstDayOfWeek = firstDay.getDay();

    // 이전 달의 마지막 날
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const calendarDays = [];

    // 이전 달의 날짜 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = prevMonthLastDay - firstDayOfWeek + i + 1;
      calendarDays.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
      });
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      calendarDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 다음 달의 날짜 채우기 (6주 채우기)
    const nextMonth = 42 - calendarDays.length; // 6주 * 7일 = 42
    for (let i = 1; i <= nextMonth; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    setCalendar(calendarDays);
  }, []);

  return (
    <div className="calendar">
      <div className="calendar-container">
        {/* 요일 헤더 */}
        <div className="calendar-weeks">
          {weeks.map((day, index) => (
            <div
              key={index}
              className={`calendar-day${index === 0 ? "-sun" : ""}${
                index === 6 ? "-sat" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 달력 날짜 */}
        <div className="calender-body">
          {calendar.map((week, index) => (
            <div key={index} className="calender-day">
              <div className="calender-date">{week.date.getDate()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
