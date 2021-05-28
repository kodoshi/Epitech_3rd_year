import React from 'react';
import { Sentence } from './Sentence';
import './Weather.css'

export class Info extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let temp = Math.floor(this.props.temp)
    return (
      <div className="main-container">
            {(
                <div className="city">
                    <h2 className="city-name">
                        <span>{this.props.city}</span>
                        <sup>{this.props.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {temp}
                        
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${this.props.weather[0].icon}@2x.png`} alt={this.props.weather[0].description} />
                        <p>{this.props.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
  }
}
