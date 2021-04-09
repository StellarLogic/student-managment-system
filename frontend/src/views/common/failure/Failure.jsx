import React from "react";
import { Link } from "react-router-dom";
import images from "src/assets/images/images";
import "./styles.scss";

const { failure } = images;

const Failure = ({ label, path }) => {
  console.log("link :>> ", path);
  return (
    <div className="failure">
      <img src={failure} alt="" className="fail-img" />
      <p className="label">{label ? label : "Not Found"}</p>
      {path && (
        <Link className="btn btn-pill btn-primary" to={path.to}>
          {path.name}
        </Link>
      )}
    </div>
  );
};

export default Failure;
