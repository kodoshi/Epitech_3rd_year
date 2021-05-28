import React, { Component } from 'react';
import './Weather.css';
import { Info } from './Info';
import { Searchbar } from './Searchbar';

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      location: null,
      latitude: null,
      longitude: null,
      loading: true,
      message: null,
      fetching: true
    };
    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
  }

  // fetch weather
  callWeatherApi = async (latitude, longitude, location) => {
    let response = await fetch('http://localhost:8080/weather?latitude=' + latitude + '&longitude=' + longitude + '&location=' + location);
    let body = await response.json();

    if (body.cod == 404) {
      console.log("error")
      throw Error(body.message);
    } else {
      console.log(body.message)
      this.setState({
        errorText: "",
        data: body,
        loading: false
      })
      return body;
    }
  };

  // 4. Grab location from Searchbar and then callWeatherApi
  changeLocation(location) {
    this.setState({
      location: location
    }, () => {
      this.callWeatherApi("latitude", "longitude", this.state.location)
        .then(res => this.setState({ response: res.express }))
        .catch(err =>
          this.setState({
            errorText: "city does not exist",
          }),
          console.log(this.state.errorText)

        );
    });
  }

  // 3. Grab geocoords from browser window, then callApiWithCoords
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem('latitude', position.coords.latitude);
          localStorage.setItem('longitude', position.coords.longitude);
          this.callWeatherApi(position.coords.latitude, position.coords.longitude, "geo")
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
        },
        (error) => {
          this.setState({
            error: error.message,
          });
        }
      );
    }
  }

  // 2. callWeatherApi with cached coords
  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState({
      latitude: cachedLat,
      longitude: cachedLon
    }, () => {
      this.callWeatherApi(this.state.latitude, this.state.longitude, "geo")
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    });
  }

  // 1. When component mounts, set cached variables, if lat exists then callWeatherApi, if not then get lat and lon and callWeatherApi
  componentDidMount() {

    let cachedLat = localStorage.getItem('latitude');
    let cachedLon = localStorage.getItem('longitude');

    // checks to see if a lat already exists. If so, then no need to getCoords()
    cachedLat ? this.setCoordsFromLocalStorage(cachedLat, cachedLon) : this.getCoords();
    this._interval = setInterval(() => {
      cachedLat ? this.setCoordsFromLocalStorage(cachedLat, cachedLon) : this.getCoords();
    }, 60000);

  }
  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      <div className="App">
        <Searchbar errorClass={this.state.errorClass} onSubmit={this.changeLocation} onClick={this.changeLocation} />
        {
          this.state.loading ?
            <div className="loading"><p>loading...</p></div> :
            <Info
              errorText={this.state.errorText}
              formError={this.state.formError}
              location={this.state.location}
              lat={this.state.latitude}
              lon={this.state.longitude}
              city={this.state.data.name}
              country={this.state.data.sys.country}
              temp={this.state.data.main.temp}
              humidity={this.state.data.main.humidity}
              weather={this.state.data.weather}
              windSpeed={this.state.data.wind.speed}
            />
        }
      </div>

    );
  }
}

export default Weather;