import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import AuthContext from "../Context/auth-context";
import Button from "../Components/Button/Button";
import Modal from "../Components/Modal/Modal";
import Products from "../Components/Products/Products";
import Input from "../Components/Input/Input";

const PageSell = (props) => {
  const [loadedProducts, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addURL, setAddUrl] = useState("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await axios.get(
          `http://localhost:5000/api/products/${authContext.userId}`,
          {
            headers: { token: authContext.token, userId: authContext.userId },
          }
        );
        setProducts(responseData.data.products);
      } catch (error) {
        console.log("[ERROR][GET][PRODUCTS] Fetching products failed");
        console.log(error);
        return;
      }
    };
    fetchProducts();
  }, [authContext]);

  const addProductHandler = async () => {
    let newItem;
    try {
      newItem = {
        name: addName,
        price: addPrice,
        image: addURL,
        userId: authContext.userId
      };

      await axios.post("http://localhost:5000/api/products", newItem, {
        headers: { token: authContext.token, userId: authContext.userId },
      });

    } catch (error) {
      console.log("[ERROR][POST][PRODUCTS] Add products failed");
      console.log(error);
      return;
    }
    
    setProducts(loadedProducts.concat(newItem));
    setFormModal(false);
  };

  const deleteProductHandler = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${currentItem.id}`,
        { headers: { token: authContext.token, userId: authContext.userId } }
      );
    } catch (error) {
      console.log("[ERROR][DELETE][PRODUCTS] Delete products failed");
      console.log(error);
      return;
    }

    setIsModal(false);
    setProducts((prev) => {
      const newList = prev.filter((item) => item.id !== currentItem.id);
      return newList;
    });
  };

  const clickHandler = (item) => {
    setCurrentItem(item);
    setIsModal(true);
  };

  const cancelHandler = () => {
    setIsModal(false);
    setFormModal(false);
  };

  const addFormHandler = () => {
    setFormModal(true);
  };

  const nameChangeHandler = (e) => {
    setAddName(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setAddPrice(e.target.value);
  };

  const imageChangeHandler = (e) => {
    setAddUrl(e.target.value);
  };

  return (
    <React.Fragment>
      {isModal && (
        <Modal cancel={cancelHandler}>
          <h1>{`Do you really want to delete ${currentItem.name} ?`}</h1>
          <Button click={deleteProductHandler} text="Confirm!" color="green" />
          <Button click={cancelHandler} text="Cancel!" />
        </Modal>
      )}
      {formModal && (
        <Modal cancel={cancelHandler}>
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="Enter product's name..."
            value={addName}
            change={nameChangeHandler}
          />
          <Input
            type="text"
            id="price"
            label="Price"
            placeholder="Enter product's price..."
            value={addPrice}
            change={priceChangeHandler}
          />
          <Input
            type="text"
            id="image"
            label="Image URL"
            placeholder="Enter product's image URL..."
            value={addURL}
            change={imageChangeHandler}
          />
          <Button text="Add!" click={addProductHandler} />
        </Modal>
      )}
      <Products
        sell={true}
        items={loadedProducts}
        click={clickHandler}
        update={addFormHandler}
      />
    </React.Fragment>
  );
};

export default PageSell;
