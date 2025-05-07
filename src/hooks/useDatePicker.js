import { useEffect, useState } from "react";
import { getToday, isFutureDate, isSameDay } from "@/utils/date-utils";

const useDatePicker = (selectedDate, hasEntryForDate) => {
  const [currentView, setCurrentView] = useState(new Date(selectedDate));
  const [visibleDates, setVisibleDates] = useState([]);
  const today = getToday();

  /* 초기 뷰 설정 - 처음부터 오늘 날짜가 표시되도록 설정 */
  const calculateInitialView = () => {
    // 오늘 날짜가 마지막(5번째)에 오도록 초기 뷰 날짜 계산
    const initialView = new Date(today);
    initialView.setDate(today.getDate() - 4);
    return initialView;
  };

  /* 화면에 표시할 날짜들 (총 5일) */
  const generateVisibleDates = () => {
    const startDate = new Date(currentView);
    startDate.setDate(currentView.getDate());

    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // 날짜가 오늘보다 미래인지 확인
      const isFuture = isFutureDate(date);
      // 해당 날짜에 일기가 이미 있는지 확인
      const hasEntry = hasEntryForDate(date, selectedDate.id);

      const newDate = {
        date,
        isFuture,
        hasEntry,
        isToday: date.getTime() === today.getTime(),
        isSelected: isSameDay(date, new Date(selectedDate)),
      };

      dates.push(newDate);
    }

    setVisibleDates(dates);
  };

  /* 가장 최근 날짜가 오늘인지 확인하는 함수 */
  const isLatestDateToday = () => {
    if (visibleDates.length === 0) return false;

    const latestDate = visibleDates[visibleDates.length - 1];
    return latestDate.isToday || latestDate.isFuture;
  };

  /* 날짜 이동 함수 */
  const changeDate = (amount) => {
    // 이미 최신 날짜가 오늘이고 앞으로 이동하려는 경우 막기
    if (amount > 0 && isLatestDateToday()) return;

    const newDate = new Date(currentView);
    newDate.setDate(currentView.getDate() + amount);

    // 미래로 너무 많이 이동하지 않도록 제한
    if (amount > 0) {
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() - 4); // 오늘이 마지막에 보이도록 조정

      if (newDate > maxDate) {
        newDate.setTime(maxDate.getTime());
      }
    }

    setCurrentView(newDate);
  };

  /* 컴포넌트가 처음 마운트될 때 오늘 날짜가 표시되도록 날짜 조정 */
  useEffect(() => {
    setCurrentView(calculateInitialView());
  }, []);

  /* 현재 보고 있는 날짜가 변경될 때마다 표시할 날짜 업데이트 */
  useEffect(() => {
    generateVisibleDates();
  }, [currentView, selectedDate]);

  return {
    currentView,
    visibleDates,
    changeDate,
    isLatestDateToday,
  };
};

export default useDatePicker;
