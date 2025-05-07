import "./App.css";
import { createContext, useReducer, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Diary from "@/pages/Diary";
import Edit from "@/pages/Edit";
import Home from "@/pages/Home";
import List from "@/pages/List";
import New from "@/pages/New";
import Notfound from "@/pages/Notfound";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-05-02").getTime(),
    emotionId: 4,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-05-04").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const DateContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const idRef = useRef(3);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: { id, createdDate, emotionId, content },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  const changeDate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <DateContext.Provider value={{ currentDate, changeDate }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </DateContext.Provider>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
