import React from "react";
import { Component } from "react";
import "./Form.css";
class Form extends Component {
  state = {
    iconID: "",
    name: "",
    mainTemp: "",
    forecast: "",
    description: "",
  };
  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&appid=fd101856268b92f37fcb9280a3235743"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          forecast:
            "The temperature in lucknow is " + data.main.temp + " degree",
        });
        console.log(data);
      });
  }
  handleForm = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    if (!city) {
      this.setState({ mainTemp: "" });
      this.setState({ forecast: "" });
      this.setState({ iconID: "" });
      this.setState({ description: "" });
      this.setState({ name: "Please enter city name" });
    } else {
      this.setState({ forecast: "" });
      this.setState({ mainTemp: "" });
      this.setState({ iconID: "" });
      this.setState({ description: "" });
      this.setState({ name: "Loading..." });
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          encodeURIComponent(city) +
          "&units=metric&appid=590d1d148a8ebee34d9415b944e7a274"
      )
        .then((response) => response.json())
        .then((data, error) => {
          if (error) {
            this.setState({ name: "Unable to access service" });
          } else if (data.message) {
            this.setState({
              name: "Unable to find city,Try another search",
            });
          } else {
            this.setState({
              forecast: "",
              iconID: data.weather[0].icon,
              name: data.name,
              countrycode: data.sys.country,
              mainTemp:
                "The temperatue in " +
                data.name +
                " is " +
                data.main.temp +
                "degree",
              description: data.weather[0].description,
            });
          }
          console.log(data);
        });
    }
  };

  render() {
    return (
      <div className="main">
        <div className="form">
          <form onSubmit={this.handleForm}>
            <h1>Weather App</h1>
            <p>Find out current Weather in your city</p>
            <input
              type="text"
              class="form-control"
              name="city"
              placeholder="Enter city name"
            />
            <br />
            <button type="submit" className="btn btn-primary btn-lg">
              Search
            </button>
          </form>
        </div>

        <div className="contentdiv">
          <h1>{this.state.forecast}</h1>
          <h1 style={{ fontWeight: "bold" }}>{this.state.name}</h1>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              this.state.iconID +
              "@2x.png"
            }
            alt=""
          />
          <h2>{this.state.mainTemp}</h2>
        </div>
      </div>
    );
  }
}

export default Form;
