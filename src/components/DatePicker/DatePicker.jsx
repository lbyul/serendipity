import "./DatePicker.css";
import { useRef } from "react";
import useDatePicker from "@/hooks/useDatePicker";
import useDiaryEntries from "@/hooks/useDiaryEntries";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutsideClick";

const DatePicker = ({ selectedDate, onSelectDate, isOpen, onClose }) => {
  const datePickerRef = useRef(null);
  const { hasEntryForDate } = useDiaryEntries();
  const { currentView, visibleDates, changeDate, isLatestDateToday } =
    useDatePicker(selectedDate, hasEntryForDate);

  useEscapeKey(isOpen, onClose);
  useOutsideClick(datePickerRef, isOpen, onClose);

  if (!isOpen) return null;

  // 날짜 선택 함수
  const handleSelectDate = (dateInfo) => {
    if (dateInfo.isFuture) return; // 미래 날짜 선택 제한

    onSelectDate(dateInfo.date);
    onClose();
  };

  // 현재 보고 있는 년월 계산
  const currentYear = currentView.getFullYear();
  const currentMonth = currentView.getMonth() + 1;

  // 요일 이름 배열
  const weekDays = ["일", "월", "화", "수", "목", "금", " 토"];

  // 오른쪽 화살표 표시 여부
  const showRightArrow = !isLatestDateToday();

  return (
    <div className="date-picker-overlay">
      <div className="date-picker" ref={datePickerRef}>
        <div className="date-picker-header">
          {currentYear}년 {currentMonth}월
        </div>

        <div className="date-picker-container">
          <button
            className="arrow-button left-arrow"
            onClick={() => changeDate(-5)}
          >
            &lt;
          </button>

          <div className="date-picker-days">
            {visibleDates.map((dateInfo, index) => {
              // 이 날짜의 요일 계산
              const dayOfWeek = dateInfo.date.getDay();
              // 날짜 객체에서 일(day) 추출
              const dayOfMonth = dateInfo.date.getDate();

              return (
                <div
                  key={index}
                  onClick={() => handleSelectDate(dateInfo)}
                  className={`date-option ${
                    dateInfo.isSelected ? "selected" : ""
                  } 
                ${dateInfo.isFuture ? "future" : ""} ${
                    dateInfo.hasEntry ? "has-entry" : ""
                  }`}
                >
                  <div className="date-number">{dayOfMonth}</div>
                  <div className="day-name">{weekDays[dayOfWeek]}</div>
                </div>
              );
            })}
          </div>

          {showRightArrow ? (
            <button
              className="arrow-button right-arrow"
              onClick={() => changeDate(5)}
            >
              &gt;
            </button>
          ) : (
            <div
              className="arrow-button-placeholder"
              style={{ width: "36px" }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
