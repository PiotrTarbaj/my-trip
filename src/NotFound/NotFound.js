import React from "react";
import { Link } from "react-router-dom";
import "../NotFound/NotFound.scss";

const NotFound = () => {
  return (
    <div className="container-notfound">
      <h1>Błąd 404</h1>
      <Link to="/">Przejdź do strony głównej</Link>
    </div>
  );
};

export default NotFound;
