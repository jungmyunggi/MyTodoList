import { useState, useEffect } from 'react';
export default function Clock({ classname }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const section = String(date.getSeconds()).padStart(2, '0');

        return `${year}년${month}월${day}일 ${hour}시${minute}분${section}초`;
    };
    return (
        <div className={classname} style={{ textAlign: 'center' }}>
            <h1>현재 시간</h1>
            <h1>{formatDate(time)}</h1>
        </div>
    );
}
