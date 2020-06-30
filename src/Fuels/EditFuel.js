import React, { useState } from "react";

const EditFuel = ({ fuel, onSave }) => {
  const [name, setName] = useState(fuel.name);
  const [price, setPrice] = useState(fuel.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFuel = {
      name: name,
      price: price,
    };
    fetch(`http://localhost:3000/fuel/${fuel.id}`, {
      method: "PUT",
      body: JSON.stringify(newFuel),
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
          name="name"
          placeholder="Nazwa paliwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder="Cena za litr"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="submit" value="Zapisz" />
      </form>
    </div>
  );
};

export default EditFuel;
