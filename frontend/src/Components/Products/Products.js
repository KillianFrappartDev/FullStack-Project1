import React from "react";

import Product from "../Product/Product";
import "./Products.css";

const DUMMY_PRODUCTS = [
  {
    name: "Watch",
    price: 15,
    image: "https://d3ift91kaax4b9.cloudfront.net/media/catalog/product/cache/eb51c2c13a771900639634451ef25d5a/3/_/3_161_4.jpg"
  },
  {
    name: "Shoes",
    price: 50,
    image: "https://cdn.laredoute.com/products/680by680/c/3/e/c3e35981dd471a6eef41f6157c7a4582.jpg"
  },
  {
    name: "Computer",
    price: 199,
    image: "https://www.worten.pt/i/5acae55d8ec2720c06340e89b148b77dec976ec7.jpg"
  },
];

const Products = (props) => {
  return (
    <div className="products">
      {DUMMY_PRODUCTS.map((prod) => (
        <Product name={prod.name} price={prod.price} image={prod.image} />
      ))}
    </div>
  );
};

export default Products;

