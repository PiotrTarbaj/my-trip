import React from "react";
import { Link } from "react-router-dom";
import "../Main/Main.scss";

const Main = () => {
  return (
    <div className="container-main">
      <div className="background-fixed"></div>
      <section>
        <Link to="/cars">
          <h2>Moje samochody</h2>
        </Link>
      </section>
      <section>
        <Link to="/fuels">
          <h2>Koszty paliwa</h2>
        </Link>
      </section>
      <section>
        <Link to="/map">
          <h2>Wyznacz trasę</h2>
        </Link>
      </section>
    </div>
  );
};

export default Main;
