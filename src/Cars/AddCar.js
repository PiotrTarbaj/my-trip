import React, { useState } from "react";
import Fuels from "../Fuels/Fuels";

const AddCar = ({ onAdd }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [average, setAverage] = useState("");
  const [speed, setSpeed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      brand: brand,
      model: model,
      fuel: fuel,
      average: average,
      speed: speed,
    };
    console.log(newCar);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Dodaj" />
      </form>
    </>
  );
};

export default AddCar;
