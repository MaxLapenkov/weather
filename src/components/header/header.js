import React from 'react';
import './header.css';
const Header = () => {
    const options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
      };
    let date = new Date();
    date = date.toLocaleString("ru", options)
    return (
        <header>
            <h1 className="visually-hidden">Погода в вашем регионе:</h1>
            <h2 className="date">Сегодня {date}</h2>
        </header>
    )
}
export default Header