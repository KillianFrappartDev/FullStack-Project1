import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import AuthContext from '../Context/auth-context';
import Button from "../Components/Button/Button";
import Modal from "../Components/Modal/Modal";
import Products from "../Components/Products/Products";

const PageSell = (props) => {
  const [loadedProducts, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const authContext = useContext(AuthContext);

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

  const addProductHandler = async () => {
    try {
      const newItem = {
        name: "laptop",
        price: 199,
        image:
          "https://target.scene7.com/is/image/Target/GUEST_2cb81429-497b-4a1f-a637-9dfcbebe38c2?wid=488&hei=488&fmt=pjpeg",
      };

      await axios.post("http://localhost:5000/api/products", newItem, { headers: { token: authContext.token, userId: authContext.userId }});

      setProducts(loadedProducts.concat(newItem));
    } catch (error) {
      console.log("[ERROR][POST][PRODUCTS] Add products failed");
      console.log(error);
      return;
    }
  };

  const deleteProductHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${currentItem.id}`, { headers: { token: authContext.token, userId: authContext.userId }});
    } catch (error) {
      console.log("[ERROR][DELETE][PRODUCTS] Delete products failed");
      console.log(error);
      return;
    }

    setIsModal(false);
    setProducts(prev => {
      const newList = prev.filter(item => item.id !== currentItem.id);
      return newList;
    });
  }

  const clickHandler = (item) => {
    setCurrentItem(item);
    setIsModal(true);
  };

  const cancelHandler = () => {
    setIsModal(false);
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
      <Products sell={true} items={loadedProducts} click={clickHandler} update={addProductHandler} />
    </React.Fragment>
  );
};

export default PageSell;
