import React, { useState, useEffect } from "react";
import "../Trip/Trip.scss";

const Trip = ({ distance }) => {
  const [cars, setCars] = useState([]);
  const [fuel, setFuel] = useState([]);

  const getCarsFromApi = () => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      });
  };

  const getFuelFromApi = () => {
    fetch("http://localhost:3000/fuel")
      .then((response) => response.json())
      .then((data) => {
        setFuel(data);
      });
  };

  useEffect(() => {
    getCarsFromApi();
    getFuelFromApi();
  }, []);

  const calculateTimeTrip = (speed) => {
    return (parseFloat(distance) / parseFloat(speed)).toFixed(2);
  };

  const calculateCostTrip = (petrol, average) => {
    let result = 0;
    const objFuel = fuel.filter((item) => item.name === petrol);
    if (objFuel.length > 0) {
      const count = parseFloat(distance) / 100;
      const amountFuel = count * parseFloat(average);
      result = (parseFloat(objFuel[0].price) * amountFuel).toFixed(2);
    }
    return result;
  };

  return (
    <div className="trip-container">
      <h1>Odległość: {distance} km</h1>
      {distance > 0 && cars.length > 0 && (
        <select>
          {cars.map((car) => (
            <option key={car.id}>
              {`${car.brand} ${car.model}: dojazd za
              ${calculateTimeTrip(car.speed)} godz., koszt: ${calculateCostTrip(
                car.fuel,
                car.average
              )} zł`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Trip;
