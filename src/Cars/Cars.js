import React, { useEffect, useState } from "react";
import Car from "./Car";
import EditCar from "./EditCar";
import AddCar from "./AddCar";
import LinkTo from "../LinkTo/LinkTo";
import "../Cars/Cars.scss";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [isAdd, setAdd] = useState(false);

  const getDataFromApi = () => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      });
  };

  const handleAdd = (car) => {
    setCars([...cars, car]);
    setAdd(false);
  };

  const handleEdit = (car) => {
    setEdit(car);
  };

  const handleSave = () => {
    setEdit(false);
    getDataFromApi();
  };

  const handleClick = () => {
    setAdd(true);
  };

  const deleteSelectedFromAPI = (id) => {
    fetch(`http://localhost:3000/cars/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        getDataFromApi();
      });
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div className="container-cars">
      <div className="background-fixed"></div>
      <h1>Moje samochody</h1>
      <button onClick={handleClick}>Dodaj samochód</button>
      {isEdit && <EditCar car={isEdit} onSave={handleSave} />}
      {isAdd && <AddCar onAdd={handleAdd} />}
      <ul>
        {cars.length > 0 &&
          cars.map((car, i) => (
            <Car
              key={car.id}
              car={car}
              onEdit={handleEdit}
              onDelete={deleteSelectedFromAPI}
            />
          ))}
      </ul>
      <LinkTo path="/" title="Powrót do strony głównej" />
    </div>
  );
};

export default Cars;
