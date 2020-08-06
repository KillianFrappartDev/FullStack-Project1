import React from "react";

import AddProduct from '../AddProduct/AddProduct';
import Product from "../Product/Product";
import "./Products.css";

const Products = (props) => {
  return (
    <div className="products">
      {props.items.map((prod) => (
        <Product click={props.click} key={prod.id} id={prod.id} name={prod.name} price={prod.price} image={prod.image} sell={props.sell} />
      ))}
      {props.sell && <AddProduct update={props.update} />}
    </div>
  );
};

export default Products;

