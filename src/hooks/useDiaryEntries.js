import { useContext, useCallback } from "react";
import { DiaryStateContext } from "../App";

const useDiaryEntries = () => {
  const diaryData = useContext(DiaryStateContext);

  // 특정 날짜에 일기 있는지 확인
  const getDiaryEntry = useCallback(
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

  // 특정 날짜에 일기 있는지 여부만 확인 (DatePicker.jsx)
  const hasEntryForDate = useCallback(
    (date, excludeId = null) => {
      const dateTime = new Date(date);
      dateTime.setHours(0, 0, 0, 0);

      return diaryData.some((entry) => {
        // 현재 편집 중인 일기는 제외
        if (excludeId && String(entry.id) === String(excludeId)) {
          return false;
        }

        const entryDate = new Date(entry.createdDate);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === dateTime.getTime();
      });
    },
    [diaryData]
  );

  return {
    diaryData,
    getDiaryEntry,
    hasEntryForDate,
  };
};

export default useDiaryEntries;
