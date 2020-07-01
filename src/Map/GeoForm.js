import React, { Component } from "react";

class GeoForm extends Component {
  state = {
    message: "",
    place: "",
    apiResults: [],
    userSelection: "",
  };

  sendToApi = (place) => {
    const API = `https://nominatim.openstreetmap.org/search?q=${place}&format=geojson`;

    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (data.type === "FeatureCollection") {
          this.setState({
            message: "Operation completed!",
          });

          this.setState({
            apiResults: data.features,
          });
        }
      })
      .catch((error) => {
        this.setState({
          message: `Sending error: ${error}`,
        });
      });
  };

  handleSubmit = (e) => {
    const { message, place } = this.state;
    e.preventDefault();

    if (place.length < 2) {
      this.setState({
        message: "Name should be at least 2 characters long.",
      });
    } else {
      this.setState({
        message: "",
      });
      this.sendToApi(place);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUserSelection = (value) => {
    this.setState({
      userSelection: value,
    });
  };

  render() {
    return (
      <>
        <h2>Wyszukaj miejsce:</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Miejsce:</label>
          <input
            name="place"
            type="text"
            value={this.state.place}
            onChange={(e) => this.handleChange(e)}
          />
          <input name="submit" type="submit" value="Szukaj" />
        </form>
        <h3>{this.state.message}</h3>
        <ul>
          {this.state.apiResults.length > 0 &&
            this.state.apiResults.map((item, i) => {
              return (
                <li key={i}>
                  {item.properties.display_name}
                  <br />
                  <span>
                    {item.geometry.coordinates[0]},
                    {item.geometry.coordinates[1]}
                  </span>
                </li>
              );
            })}
        </ul>
        <div>
          <p>{this.state.userSelection}</p>
          <select
            value={this.state.userSelection}
            onChange={(e) => this.handleUserSelection(e.target.value)}
          >
            {this.state.apiResults.length > 0 &&
              this.state.apiResults.map((item, i) => {
                return <option key={i}>{item.properties.display_name}</option>;
              })}
          </select>
        </div>
      </>
    );
  }
}

export default GeoForm;
