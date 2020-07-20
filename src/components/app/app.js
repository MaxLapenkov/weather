import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WeatherService from '../../services/weather-service';
import WikiService from '../../services/wiki-service';
import WeatherPage from '../weather-page';
import TimePage from '../time-page';
import LocationPage from '../location-page';
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
            if(latitude.length > 0 && longitude.length > 0) {
                this.setState({loading: false})
            }
            this.getInfo(latitude, longitude);
          })
          
    }
    state = {
        weather: undefined,
        wiki: undefined,
    }
    render() {
        const { weather, wiki } = this.state
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
        } else  {
            return (
                <div className="container">
                    <h1 className="alert">Идет загрузка</h1>
                    <Spinner/>
                </div>
            )
        } 
    }
}