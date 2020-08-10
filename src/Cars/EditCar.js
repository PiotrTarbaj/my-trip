import React, { useState } from "react";
import Fuels from "../Fuels/Fuels";

const EditCar = ({ car, title, onSave, onCancel }) => {
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

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="container-cars--edit">
      <form onSubmit={handleSubmit}>
        <h2 className="container-cars--title">{title}</h2>
        <label>Marka:</label>
        <input
          type="text"
          name="brand"
          placeholder="Marka"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <label>Model:</label>
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <label>Paliwo:</label>
        <Fuels show="select" value={fuel} onChange={setFuel} />
        <label>Średnie spalanie:</label>
        <input
          type="number"
          min="0"
          max="100"
          name="average"
          placeholder="Średnie spalanie"
          value={average}
          onChange={(e) => setAverage(e.target.value)}
        />
        <label>Średnia prędkość:</label>
        <input
          type="number"
          min="0"
          max="300"
          name="speed"
          placeholder="Średnia prędkość"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <input type="submit" value="Zapisz" />
        <input type="button" value="Anuluj" onClick={() => handleCancel()} />
      </form>
    </div>
  );
};

export default EditCar;
