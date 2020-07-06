import React from "react";
import { Component } from "react";
import "./Form.css";
class Form extends Component {
  state = {
    iconID: "",
    name: "",
    counrytcode: "",
    mainTemp: "",
    humidity: "",
    description: "",
  };

  handleForm = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=590d1d148a8ebee34d9415b944e7a274"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          iconID: data.weather[0].icon,
          name: data.name,
          countrycode: data.sys.country,
          mainTemp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
        });
        console.log(data);
      })
      .catch((error) => console.error(error));
    //console.log(city)
  };

  render() {
    return (
      <div className="main">
        <div className="contentdiv">
          <form onSubmit={this.handleForm} id="form">
            <h1>Weather App</h1>
            <p>Find out current Weather in your city</p>
            <input type="text" name="city" placeholder="Enter city name" />
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
            <br />
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                this.state.iconID +
                "@2x.png"
              }
              alt=""
            />
            <h1 style={{ fontWeight: "bold" }}>
              {this.state.name} {this.state.countrycode}
            </h1>
            <h1>Temperature:{this.state.mainTemp}</h1>
            <h1>Humidity:{this.state.humidity}</h1>
            <h1>Description:{this.state.description}</h1>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
