import React from "react";

import "./AddProduct.css";

const AddProduct = (props) => {
  return (
    <div onClick={props.update} className="product-add">
      +
    </div>
  );
};

export default AddProduct;
