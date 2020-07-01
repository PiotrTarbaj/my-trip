import React, { useEffect, useState } from "react";
import Fuel from "./Fuel";
import EditFuel from "./EditFuel";
import LinkTo from "../LinkTo/LinkTo";
import "../Fuels/Fuels.scss";

const Fuels = ({ show, value, onChange }) => {
  const [fuels, setFuels] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(value);

  const getDataFromApi = () => {
    fetch("http://localhost:3000/fuel")
      .then((response) => response.json())
      .then((data) => {
        setFuels(data);
      });
  };

  const handleEdit = (fuel) => {
    setEdit(fuel);
  };

  const handleSave = () => {
    setEdit(false);
    getDataFromApi();
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  if (show === "select") {
    return (
      <select
        name="fuel"
        onChange={(e) => {
          setCurrentSelection(e.target.value);
          onChange(e.target.value);
        }}
        value={currentSelection}
      >
        {fuels.map((fuel, i) => (
          <Fuel key={fuel.id} fuel={fuel} show={show} />
        ))}
      </select>
    );
  } else
    return (
      <div className="container-fuels">
        <div className="background-fixed"></div>
        <h1>Koszty paliwa</h1>
        {isEdit && <EditFuel fuel={isEdit} onSave={handleSave} />}
        <ul>
          {fuels.length > 0 &&
            fuels.map((fuel, i) => (
              <Fuel key={fuel.id} fuel={fuel} onEdit={handleEdit} />
            ))}
        </ul>
        <LinkTo path="/" title="Powrót do strony głównej" />
      </div>
    );
};

export default Fuels;
