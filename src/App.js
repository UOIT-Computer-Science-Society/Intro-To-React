import React, { Component } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";


//BAD PRACTICE!
const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";

class App extends Component {

  //Create state to hold values
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = async event => {
    event.preventDefault();

    //Get the city and country values
    const city = event.currentTarget.elements.city.value;
    const country = event.currentTarget.elements.country.value;

    //If City and Country has a value
    if (city && country) {

      //Do an API call to the Openweathermap API using fetch
      try {
        const apiCall = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );

        
        const { main, sys, name, weather } = await apiCall.json();

        //Update the state with new values
        this.setState({
          temperature: main.temp,
          city: name,
          country: sys.country,
          humidity: main.humidity,
          description: weather[0].description,
          error: ""
        });
      } catch (ex) {
        console.log(ex.message);
      }
    } 

    //Country AND City have no values
    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  };


  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-xs-5 title-container">
                {/**Insert Title Component Here */}
              </div>
              <div className="col-xs-7 form-container">

                {/**Insert Form Component Here */}
                
                {/**Insert Weather Component Here */}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
