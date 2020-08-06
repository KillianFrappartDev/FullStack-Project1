import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '../Components/Button/Button';
import Modal from '../Components/Modal/Modal';
import Products from '../Components/Products/Products';

const PageProducts = props => {
    const [loadedProducts, setProducts] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [currentItem, setCurrentItem] = useState("");

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

    const clickHandler = (item) => {
      setCurrentItem(item.name);
      setIsModal(true);
    };

    const cancelHandler = () => {
      setIsModal(false);
    };

    return (
      <React.Fragment>
        {isModal && (
        <Modal cancel={cancelHandler}> 
          <h1>{`Do you really want to buy ${currentItem} ?`}</h1>
          <Button click={cancelHandler} text="Confirm!" color="green" />
          <Button click={cancelHandler} text="Cancel!" />
        </Modal>
          )}
        <Products click={clickHandler} items={loadedProducts} />
      </React.Fragment>
    );
}

export default PageProducts;