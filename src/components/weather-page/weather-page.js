import React from 'react';
import './weather-page.css';

const WeatherPage = (weather) => {
    
    const data = weather.weather;
    const imageSrc = require(`../../icons/${data.weather[0].icon}.png`);
    
    
    const kelvin = 273.15;
    const windDeg = data.wind.deg;
    let wind = 'Северный';
    if (windDeg > 22 && windDeg < 67) {
        wind = 'Северо-восточный';
    } else if (windDeg > 67 && windDeg <= 112) {
        wind = 'Восточный';
    } else if (windDeg > 112 && windDeg <= 157) {
        wind = 'Юго-восточный';
    } else if (windDeg > 157 && windDeg <= 202) {
        wind = 'Южный';
    } else if (windDeg > 202 && windDeg <= 247) {
        wind = 'Юго-западный';
    } else if (windDeg > 247 && windDeg <= 292) {
        wind = 'Западный';
    } else if (windDeg > 292 && windDeg <= 337) {
        wind = 'Северо-западный';
    }

    
    return (
    <main>
        <h2 className="city">{data.name}</h2>
        <p className="desc">{data.weather[0].description}</p>
        <div className="row">
            <div className="col">
                <p className="temper">Температура: <br/> {Math.round(data.main.temp - kelvin)} 	&#176;C</p>
                <p className="temper">Ощущается как: <br/> {Math.round(data.main.feels_like - kelvin)} 	&#176;C</p>
            </div>
            <img src={imageSrc} alt="Картинка погоды" width="200" height="200"/>
        </div>
        <div className="col">
                <p>Давление: {Math.round(data.main.pressure * 0.750062)} миллиметров ртутного столба</p>
                <p>Влажность: {data.main.humidity} %</p>
                <p>Ветер {wind} {data.wind.speed} м/с</p>
            </div>     
    </main>
    
)
}
export default WeatherPage