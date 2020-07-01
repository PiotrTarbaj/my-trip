import React from "react";
import { Link } from "react-router-dom";

const LinkTo = ({ path, title }) => {
  return <Link to={path}>{title}</Link>;
};

export default LinkTo;
