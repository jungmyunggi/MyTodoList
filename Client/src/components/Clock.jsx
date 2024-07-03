import { useState, useEffect } from 'react';
import formatDate from '../util/formatDate';
export default function Clock({ classname }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    
    return (
        <div className={classname} style={{ textAlign: 'center' }}>
          
            <h1>{formatDate(time).slice(0,11)}</h1>
            <h1>{formatDate(time).slice(11)}</h1>
            
        </div>
    );
}
