import React, { Component } from 'react';
import './time-page.css';
export default class TimePage extends Component {
    options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
    state = {
        date: null
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            date: new Date().toLocaleString("ru", this.options)
        });
    }
    render() {
        const { date } = this.state;
        return (
            <header>
                <h1 className="visually-hidden">Погода в вашем регионе:</h1>
                <h2 className="date">Сегодня {date}</h2>
            </header>
        )
    }
    
    
}
