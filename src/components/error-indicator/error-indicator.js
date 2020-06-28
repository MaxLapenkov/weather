import React from 'react';
import './error-indicator.css'
import icon from './picachu-error.png';
const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error-icon" width="64"/>
            <span className="boom">BOOM!<br/> Something has gone wrong</span>
            <span>It will be fixed soon</span>
        </div>
    )
}
export default ErrorIndicator;