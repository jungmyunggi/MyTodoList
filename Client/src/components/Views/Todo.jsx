import { useState, useEffect } from "react";
import "../../assets/styles/todo/todo.scss";
import { fetchSchedule, addSchedule } from "../../util/api";
import NewScheduleModal from "../modals/NewScheduleModal";
import axios from "axios";

export default function Todo() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nowDate = new Date();
  const [selectedDate, setSelectedDate] = useState(nowDate);
  const [schedule, setSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const weeks = [];
  let days = [];

  useEffect(() => {
    const fetchAndSetSchedule = async (date) => {
      try {
        const response = await fetchSchedule(date);
        setSchedule(response);
      } catch (error) {
        setSchedule(null);
      }
    };

    if (selectedDate) {
      const dateStr = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
      fetchAndSetSchedule(dateStr);
    }
  }, [selectedDate, isModalOpen]);

  const handleDateClick = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(date);
    console.log(selectedDate);
  };

  const handleAddSchedule = async (newSchedule) => {
    try {
      const response = await addSchedule(newSchedule);
      if (response === 201) {
        const res = await fetchSchedule(selectedDate);
        setSchedule(res);
      }
    } catch (error) {
      throw error;
    }
  };

  for (let i = 0; i < startDay; i++) {
    days.push(<div className="empty" key={`empty-${i}`}></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(
      <div
        className={`day ${
          selectedDate && selectedDate.getDate() === d ? "selected" : ""
        }`}
        key={d}
        onClick={() => handleDateClick(d)}
      >
        {d}
      </div>
    );
    if (days.length === 7) {
      weeks.push(
        <div className="week" key={`week-${d}`}>
          {days}
        </div>
      );
      days = [];
    }
  }

  if (days.length > 0) {
    while (days.length < 7) {
      days.push(
        <div className="empty" key={`empty-${days.length + daysInMonth}`}></div>
      );
    }
    weeks.push(
      <div className="week" key="last-week">
        {days}
      </div>
    );
  }

  const previousMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
    if (
      newDate.getFullYear() === nowDate.getFullYear() &&
      newDate.getMonth() === nowDate.getMonth()
    ) {
      setSelectedDate(nowDate);
    } else {
      setSelectedDate(null);
    }
  };

  const nextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
    if (
      newDate.getFullYear() === nowDate.getFullYear() &&
      newDate.getMonth() === nowDate.getMonth()
    ) {
      setSelectedDate(nowDate);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-calender">
        <div className="todo-header">
          <button onClick={previousMonth}>{"<"}</button>
          <h2>
            {" "}
            {currentDate.getFullYear()}년{" "}
            {currentDate.toLocaleString("default", { month: "long" })}
          </h2>
          <button onClick={nextMonth}>{">"}</button>
        </div>
        <div className="days-of-week">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div className="day-of-week" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="weeks">{weeks}</div>
      </div>
      <div className="todo-schedule">
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>할일</th>
              <th>장소</th>
              <button onClick={() => setIsModalOpen(true)}>일정 추가</button>
            </tr>
          </thead>
          <tbody>
            {schedule && schedule.length > 0 ? (
              schedule.map((item) => (
                <tr
                  key={item.id}
                  className={checkedItems[item.id] ? "checked" : ""}
                >
                  <td>{item.time}</td>
                  <td>{item.todo}</td>
                  <td>{item.place}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
                    ></input>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">일정이 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && (
          <NewScheduleModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddSchedule}
          />
        )}
      </div>
    </div>
  );
}
