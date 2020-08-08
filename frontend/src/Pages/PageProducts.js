import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import AuthContext from "../Context/auth-context";
import Button from "../Components/Button/Button";
import Modal from "../Components/Modal/Modal";
import Products from "../Components/Products/Products";

const PageProducts = (props) => {
  const [loadedProducts, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (!storedData || authContext.isLogged) {
      return;
    } else {
      authContext.login(storedData.token, storedData.userId, storedData.userName);
    }
  }, [authContext]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await axios.get(
          "http://localhost:5000/api/products"
        );
        setProducts(responseData.data.products);
      } catch (error) {
        console.log("[ERROR][GET][PRODUCTS] Fetching products failed");
        console.log(error);
        return;
      }
    };
    fetchProducts();
  }, []);

  const clickHandler = (item) => {
    setCurrentItem(item);
    setIsModal(true);
  };

  const cancelHandler = () => {
    setIsModal(false);
  };

  const buyHandler = async () => {
    if (!authContext.isLogged) {
      history.push("/auth");
    }

    const newOrder = {
      product: currentItem.name,
      price: currentItem.price,
      userName: authContext.userName,
      productId: currentItem.id
    };
    try {
      await axios.post("http://localhost:5000/api/orders", newOrder, {
        headers: { token: authContext.token, userId: authContext.userId },
      });
    } catch (error) {
      console.log("[ERROR][POST][ORDERS] Add order failed");
      console.log(error);
      return;
    }

    setIsModal(false);
  };

  return (
    <React.Fragment>
      {isModal && (
        <Modal cancel={cancelHandler}>
          <h1 className="modal-title">{`Do you really want to buy ${currentItem.name} ?`}</h1>
          <Button click={buyHandler} text="Confirm!" color="green" />
          <Button click={cancelHandler} text="Cancel!" />
        </Modal>
      )}
      <Products click={clickHandler} items={loadedProducts} />
    </React.Fragment>
  );
};

export default PageProducts;
