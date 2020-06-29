import React from 'react';
import './error-indicator.css'
import icon from './error.png';
const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error-icon" width="64" className="error-icon"/>
            <span className="boom">Произошла ошибка</span>
            <span>Попробуйте переподключиться еще раз</span>
        </div>
    )
}
export default ErrorIndicator;