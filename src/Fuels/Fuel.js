import React from "react";

const Fuel = ({ fuel, show, onEdit }) => {
  if (show === "select") {
    return <option value={fuel.name}>{fuel.name}</option>;
  } else {
    return (
      <li>
        <section className="fuel-item">
          <div className="fuel-item--name">{fuel.name}</div>
          <div className="fuel-item--price">{fuel.price}</div>
        </section>
        <button onClick={() => onEdit(fuel)}>Edytuj</button>
      </li>
    );
  }
};

export default Fuel;
