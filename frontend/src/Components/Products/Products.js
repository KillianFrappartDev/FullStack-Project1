import React, { useEffect, useState } from "react";
import axios from 'axios';

import AddProduct from '../AddProduct/AddProduct';
import Product from "../Product/Product";
import "./Products.css";

const Products = (props) => {
  const [loadedProducts, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await axios.get("http://localhost:5000/api/products");
        setProducts(responseData.data.products);
      } catch (error) {
        console.log("[ERROR][GET][PRODUCTS] Fetching products failed");
        console.log(error);
        return;
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="products">
      {loadedProducts.map((prod) => (
        <Product key={prod.id} name={prod.name} price={prod.price} image={prod.image} sell={props.sell} />
      ))}
      {props.sell && <AddProduct />}
    </div>
  );
};

export default Products;

