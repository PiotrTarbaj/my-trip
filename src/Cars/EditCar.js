import React, { useState } from "react";
import Fuels from "../Fuels/Fuels";

const EditCar = ({ car, onSave }) => {
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [fuel, setFuel] = useState(car.fuel);
  const [average, setAverage] = useState(car.average);
  const [speed, setSpeed] = useState(car.speed);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      brand: brand,
      model: model,
      fuel: fuel,
      average: average,
      speed: speed,
    };
    fetch(`http://localhost:3000/cars/${car.id}`, {
      method: "PUT",
      body: JSON.stringify(newCar),
      headers: {
        "content-type": "Application/JSON",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onSave();
      });
  };

  const containerStyle = {
    height: "80vh",
    width: "80vw",
    display: "flex",
    position: "absolute",
    backgroundColor: "#bada55",
  };

  const editStyle = {
    height: "200px",
    width: "200px",
  };

  return (
    <div style={containerStyle}>
      <form style={editStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="brand"
          placeholder="Marka"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <Fuels show="select" value={fuel} onChange={setFuel} />
        <input
          type="text"
          name="average"
          placeholder="Średnie spalanie"
          value={average}
          onChange={(e) => setAverage(e.target.value)}
        />
        <input
          type="text"
          name="speed"
          placeholder="Średnia prędkość"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  );
};

export default EditCar;
