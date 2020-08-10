import React, { useState, useEffect } from "react";
import Fuels from "../Fuels/Fuels";

const AddCar = ({ onAdd, onCancel, title }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("benzyna");
  const [average, setAverage] = useState(0);
  const [speed, setSpeed] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      brand: brand,
      model: model,
      fuel: fuel,
      average: average,
      speed: speed,
    };
    fetch("http://localhost:3000/cars", {
      method: "POST",
      body: JSON.stringify(newCar),
      headers: {
        "content-type": "Application/JSON",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(data);
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    //const fuelElement = document.querySelector('select[name="fuel"]');
    //console.log("Paliwo: " + fuelElement.options.length);
  }, []);

  return (
    <div className="container-cars--edit">
      <form onSubmit={handleSubmit}>
        <h2 className="container-cars--title">{title}</h2>
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
          type="number"
          min="0"
          max="100"
          name="average"
          placeholder="Średnie spalanie"
          value={average}
          onChange={(e) => setAverage(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="300"
          name="speed"
          placeholder="Średnia prędkość"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <input type="submit" value="Dodaj" />
        <input type="button" value="Anuluj" onClick={() => handleCancel()} />
      </form>
    </div>
  );
};

export default AddCar;
