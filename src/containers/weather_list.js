import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        if(cityData) {
            const name = cityData.city.name;
            const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
            const pressures = cityData.list.map(weather => weather.main.pressure);
            const humidities = cityData.list.map(weather => weather.main.humidity);
            const { lat, lon } = cityData.city.coord;

            return (
                <tr key={name}>
                    <td><GoogleMap lat={lat} lon={lon} /> {name}</td>
                    <Chart color="orange" data={temps} units="°C" />
                    <Chart color="green" data={pressures} units="hPa" />
                    <Chart color="blue" data={humidities} units="%" />
                </tr>
            );
        }
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (°C)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ weather }) { // const weather = state.weather coz we have only one param
    return { weather }; // if we have identical key and value we can use one world
}

export default connect(mapStateToProps)(WeatherList);
