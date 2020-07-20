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
        this.tick();
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
            <section>
                <h1 className="visually-hidden">Текущее время</h1>
                <p className="date">Сегодня {date}</p>
            </section>
        )
    }   
}
