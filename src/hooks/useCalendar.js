import { useState, useEffect, useRef } from "react";
import { getToday, isFutureDate } from "@/utils/date-utils";

const useCalendar = (date, getDiaryEntry) => {
  const [calendar, setCalendar] = useState([]);
  const today = getToday();
  const dateRef = useRef(date);

  /* 현재 년월에 맞는 캘린더 데이터 생성 */
  useEffect(() => {
    dateRef.current = date;

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

    // 1. 이전 달의 날짜 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = prevMonthLastDay - firstDayOfWeek + i + 1;
      const dayDate = new Date(year, month - 1, day);
      const isFuture = isFutureDate(dayDate);

      calendarDays.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isToday: dayDate.getTime() === today.getTime(),
        hasEntry: getDiaryEntry(dayDate),
        isFuture: isFuture,
      });
    }

    // 2. 현재 달의 날짜 채우기
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      currentDate.setHours(0, 0, 0, 0);

      const isFuture = isFutureDate(currentDate);

      calendarDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        isToday: currentDate.getTime() === today.getTime(),
        hasEntry: getDiaryEntry(currentDate),
        isFuture: isFuture,
      });
    }

    // 3. 다음 달의 날짜 채우기 (6주 채우기)
    const remainingDays = 42 - calendarDays.length; // 6주 * 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      const isFuture = isFutureDate(nextDate);

      calendarDays.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: nextDate.getTime() === today.getTime(),
        hasEntry: getDiaryEntry(nextDate),
        isFuture: isFuture,
      });
    }

    setCalendar(calendarDays);
  }, [getDiaryEntry, date]);

  return calendar;
};

export default useCalendar;
