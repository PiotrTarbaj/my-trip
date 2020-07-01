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
          <div>
            Paliwo: <span className="text-bold">{car.fuel}</span>
          </div>
          <div>
            Średnie spalanie:{" "}
            <span className="text-bold">{car.average}L/100km</span>
          </div>
          <div>
            Średnia prędkość:{" "}
            <span className="text-bold">{car.speed} km/h</span>
          </div>
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
