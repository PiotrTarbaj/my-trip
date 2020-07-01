import React from "react";
import LinkTo from "../LinkTo/LinkTo";
import "../NotFound/NotFound.scss";

const NotFound = () => {
  return (
    <div className="container-notfound">
      <div className="background-fixed"></div>
      <section>
        <h1>Błąd 404</h1>
        <h3>Nie ma takiej strony</h3>
      </section>
      <LinkTo path="/" title="Powrót do strony głównej" />
    </div>
  );
};

export default NotFound;
