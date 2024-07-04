import { useState } from "react";
import "../../assets/styles/todo/newschedule.scss";
export default function NewScheduleModal({ onClose, onSave, selectedDate }) {
  const [date, setDate] = useState("");
  const [todo, setTodo] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    onSave({ date, todo, place, time });
    onClose();
  };
  return (
    <div className="newschedule-modal-container">
      <div className="newschedule-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>New Schedule</h2>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Todo:</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div>
          <label>Place:</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}
