import React from "react";

const Fuel = ({ fuel, show, onEdit }) => {
  if (show === "select") {
    return <option value={fuel.name}>{fuel.name}</option>;
  } else {
    return (
      <li>
        <p>{fuel.name}</p>
        <p>{fuel.price}</p>
        <button onClick={() => onEdit(fuel)}>Edytuj</button>
      </li>
    );
  }
};

export default Fuel;
