import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
const Header = () => {
    
    return (
        <header className="header">
            <nav className="header__menu menu">
                <Link className="menu__link" to="/weather/time">Время</Link>
                <Link className="menu__link" to="/weather/location">Город</Link>
                <Link className="menu__link" to="/weather/current">Погода</Link>
            </nav>
        </header>
    )
}
export default Header;