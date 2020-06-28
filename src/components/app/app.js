import React, {Component} from 'react';
import ApiService from '../../services/api-service';
import MainPage from '../main-page';
import Header from '../header'
import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import './app.css';
export default class App extends Component {
    apiService = new ApiService();

    getWeather(lat, lon) {
        if(lat > 0 && lon > 0) {
            this.apiService.getWeather(lat, lon).then((weather) => {
                this.setState({
                    weather: weather
                })
            })
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getWeather(latitude, longitude)
          }); 
    }
    state = {
        weather: undefined
    }
    render() {
        if(this.state.weather) {
            return(
                <div className="container">
                    <Header/>
                    <MainPage weather={this.state.weather}/>
                </div>
            )
        } else {
            return <Spinner/>
        }   
    }
}