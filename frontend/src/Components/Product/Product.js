import React from "react";

import Button from "../Button/Button";
import "./Product.css";

const Product = (props) => {
  return (
    <div className="product">
      <img src={props.image} />
      <div className="product__info">
        <h2>{props.name}</h2>
        <h3>{props.price + "$"}</h3>
      </div>
      <Button text={props.sell ? "Delete!" : "Buy!"} size="button-small" />
    </div>
  );
};

export default Product;
