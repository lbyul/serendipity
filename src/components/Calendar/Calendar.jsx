import { useState, useEffect } from "react";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import { getEmotionImage } from "../../util/get-emotion-image";
import { useContext } from "react";
import { useCallback } from "react";
import { useRef } from "react";

const Calendar = ({ date = new Date() }) => {
  const [calendar, setCalendar] = useState([]);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const nav = useNavigate();
  const diaryData = useContext(DiaryStateContext);
  const dateRef = useRef(date);

  // 현재 날짜 (오늘)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 특정 날짜에 일기 있는지 확인
  const hasDiaryEntry = useCallback(
    (date) => {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      // 해당 날짜의 일기 목록 필터링
      const entries = diaryData.filter((entry) => {
        const entryDate = new Date(entry.createdDate);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === targetDate.getTime();
      });

      return entries.length > 0 ? entries[0] : null;
    },
    [diaryData]
  );

  // 현재 년월에 맞는 캘린더 데이터 생성
  useEffect(() => {
    dateRef.current = date;

    const year = date.getFullYear();
    const month = date.getMonth();

    const now = new Date();
    now.setHours(0, 0, 0, 0);

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
      const dayDate = new Date(year, month - 1, day);
      const isFuture = dayDate.getTime() > now.getTime();

      calendarDays.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: dayDate.getTime() === today.getTime(),
        hasEntry: hasDiaryEntry(dayDate),
        isFuture: isFuture,
      });
    }

    // 현재 달의 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      currentDate.setHours(0, 0, 0, 0);

      const isFuture = currentDate.getTime() > now.getTime();

      calendarDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        isToday: currentDate.getTime() === today.getTime(),
        hasEntry: hasDiaryEntry(currentDate),
        isFuture: isFuture,
      });
    }

    // 다음 달의 날짜 채우기 (6주 채우기)
    const remainingDays = 42 - calendarDays.length; // 6주 * 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      const isFuture = nextDate.getTime() > now.getTime();

      calendarDays.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: nextDate.getTime() === today.getTime(),
        hasEntry: hasDiaryEntry(nextDate),
        isFuture: isFuture,
      });
    }

    setCalendar(calendarDays);
  }, [hasDiaryEntry, date]);

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
