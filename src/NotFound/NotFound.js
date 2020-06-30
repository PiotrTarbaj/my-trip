import React from "react";
import { Link } from "react-router-dom";
import "../NotFound/NotFound.scss";

const NotFound = () => {
  return (
    <div className="container-notfound">
      <section>
        <h1>Błąd 404</h1>
        <h3>Nie ma takiej strony</h3>
        <Link to="/">{">>Przejdź do strony głównej<<"}</Link>
      </section>
    </div>
  );
};

export default NotFound;
