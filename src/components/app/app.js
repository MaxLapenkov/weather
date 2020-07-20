import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WeatherService from '../../services/weather-service';
import WikiService from '../../services/wiki-service';
import WeatherPage from '../pages/weather-page';
import TimePage from '../pages/time-page';
import LocationPage from '../pages/location-page';
import Header from '../header';
import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import './app.css';
export default class App extends Component {
    weatherService = new WeatherService();
    wikiService = new WikiService();
    getInfo(lat, lon) {
        if(lat > 0 && lon > 0) {
            this.setState({loading: true});
            this.weatherService.getWeather(lat, lon).then((weather) => {
                this.setState({
                    weather: weather
                })
            }).then(() => {
                this.wikiService.getWiki(`Город ${this.state.weather.name} в России`).then((info) => {
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
                if(latitude.length > 0 && longitude.length > 0) {
                    this.setState({loading: true})
                }
                this.getInfo(latitude, longitude);
          }) 
    }
    state = {
        weather: undefined,
        wiki: undefined,
        loading: false
    }
    render() {
        const { weather, wiki, loading } = this.state
        if(weather && wiki) {
            return(
                <ErrorBoundary>
                    <Router>
                        <div className="container">
                            <Header/>
                            <Switch>
                                <Route 
                                    path="/weather"
                                    render ={() => <h1 style={{textAlign: 'center'}}>Добро пожаловать в приложение Weather</h1>}
                                    exact/>
                                <Route
                                    path="/weather/current"
                                    render={() => <WeatherPage weather={this.state.weather}/>}/>
                                <Route path="/weather/time" component={TimePage}/>
                                <Route
                                    path="/weather/location"
                                    render={() => <LocationPage city={weather.name} info={wiki}/>}/>
                            </Switch>
                        </div>
                    </Router>
                </ErrorBoundary>
            )
        } else if(loading) {
            return (
                <div className="container">
                    <h1 className="alert">Загрузка</h1>
                    <Spinner/>
                </div>
            )
        }
        else if (!navigator.geolocation) {
            return (
                <h1>Ваш браузер не поддерживает геолокацию</h1>
            )
        }
        else  {
            return (
                <div className="container">
                    <h1 className="alert">Пожалуйста, предоставьте геоданные</h1>
                    <Spinner/>
                </div>
            )
        } 
    }
}