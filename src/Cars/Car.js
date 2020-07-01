import React from "react";

const Car = ({ car, onEdit, onDelete }) => {
  return (
    <li>
      <section className="car-item">
        <div className="car-item--header">
          <h3>
            {car.brand} {car.model}
          </h3>
        </div>
        <div className="car-item--info">
          <div>Paliwo: {car.fuel}</div>
          <div>Średnie spalanie: {car.average}L/100km</div>
          <div>Średnia prędkość: {car.speed} km/h</div>
        </div>
      </section>
      <button onClick={() => onEdit(car)}>Edytuj</button>
      <button
        onClick={() =>
          window.confirm(
            `Czy na pewno chcesz usunąć samochód ${car.brand} ${car.model} z listy?`
          ) && onDelete(car.id)
        }
      >
        Usuń
      </button>
    </li>
  );
};

export default Car;
