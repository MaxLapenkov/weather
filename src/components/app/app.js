import React, {Component} from 'react';
import WeatherService from '../../services/weather-service';
import WikiService from '../../services/wiki-service';
import MainPage from '../main-page';
import TimePage from '../time-page';
import Header from '../header';
import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import './app.css';
export default class App extends Component {
    weatherService = new WeatherService();
    wikiService = new WikiService();
    getInfo(lat, lon) {
        if(lat > 0 && lon > 0) {
            this.weatherService.getWeather(lat, lon).then((weather) => {
                this.setState({
                    weather: weather
                })
            }).then(() => {
                this.wikiService.getWiki(this.state.weather.name).then((info) => {
                    this.setState({
                        wiki: info
                    })
                })
            })
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getInfo(latitude, longitude);
          })
          
    }
    state = {
        weather: undefined,
        wiki: undefined
    }
    render() {
        console.log(this.state.wiki);

        if(this.state.weather) {
            console.log(this.state.weather.name);
            return(
                <div className="container">
                    <TimePage/>
                    {/* <Header/> */}
                    <ErrorBoundary>
                        <MainPage weather={this.state.weather}/>
                    </ErrorBoundary>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <h1 className="alert">Пожалуйста, предоставьте данные о своём местоположении</h1>
                    <Spinner/>
                </div>
            )
        }   
    }
}