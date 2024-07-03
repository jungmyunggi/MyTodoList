import { useState, useEffect } from "react";
import "../../assets/styles/todo/todo.scss"
import { fetchSchedule } from "../../util/api";
export default function Todo() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const nowDate = new Date();
    const [selectedDate, setSelectedDate] = useState(nowDate);
    const [schedule, setSchedule] = useState(null);
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const weeks = [];
    let days = [];

    // useEffect(() => {
    //     const fetchAndSetSchedule = async (date) => {
    //         try {
    //             const scheduleData = await fetchSchedule(date.toISOString().split('T')[0]);
    //             setSchedule(scheduleData);
    //         } catch (error) {
    //             setSchedule(null);
    //         }
    //     };

    //     fetchAndSetSchedule(selectedDate);
    // }, [selectedDate]);


    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
    };

    for (let i = 0; i < startDay; i++) {
        days.push(<div className="empty" key={`empty-${i}`}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        days.push(
            <div className={`day ${selectedDate && selectedDate.getDate() === d ? 'selected' : ''}`} key={d} onClick={() => handleDateClick(d)}>
                {d}
            </div>
        );
        if (days.length === 7) {
            weeks.push(<div className="week" key={`week-${d}`}>{days}</div>);
            days = [];
        }
    }

    if (days.length > 0) {
        while (days.length < 7) {
            days.push(<div className="empty" key={`empty-${days.length + daysInMonth}`}></div>);
        }
        weeks.push(<div className="week" key="last-week">{days}</div>);
    }

    const previousMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(newDate);
        if (newDate.getFullYear() === nowDate.getFullYear() && newDate.getMonth() === nowDate.getMonth()) {
            setSelectedDate(nowDate);
        } else {
            setSelectedDate(null);
        }
    };
    
    const nextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(newDate);
        if (newDate.getFullYear() === nowDate.getFullYear() && newDate.getMonth() === nowDate.getMonth()) {
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
                    <h2>  {currentDate.getFullYear()}년  {currentDate.toLocaleString('default', { month: 'long' })}</h2>
                    <button onClick={nextMonth}>{">"}</button>
                </div>
                <div className="days-of-week">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div className="day-of-week" key={day}>{day}</div>
                    ))}
                </div>
                <div className="weeks">{weeks}</div>
            </div>
            <div>
                <button onClick={() => {
                    const date = '2024-07-09';

                    fetchSchedule(date)
                      .then(data => {
                        console.log('Schedules:', data);
                      })
                      .catch(error => {
                        console.error('Error fetching schedules:', error);
                      });
                }}>asdf</button>
            </div>
        </div>
    );
};
