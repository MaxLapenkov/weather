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
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    date = date.toLocaleString("ru", options);

    console.log(hrs, mins, secs);
    return (
        <header>
            <h1 className="visually-hidden">Погода в вашем регионе:</h1>
            <h2 className="date">Сегодня {date}</h2>
        </header>
    )
}
export default Header;