import React from "react";
import axios from "axios";

import "./AddProduct.css";

const AddProduct = (props) => {
  const addProductHandler = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", {
        name: "test",
        price: 9,
        image: "",
      });
    } catch (error) {
      console.log("[ERROR][GET][PRODUCTS] Fetching products failed");
      console.log(error);
      return;
    }
  };

  return (
    <div onClick={addProductHandler} className="product-add">
      +
    </div>
  );
};

export default AddProduct;
