import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AuthContext from '../Context/auth-context';
import Orders from "../Components/Orders/Orders";

const PageOrders = (props) => {
  const [ordersList, setOrdersList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await axios.get(
          `${process.env.REACT_APP_API}/orders/${authContext.userId}`,
          {
            headers: { token: authContext.token, userId: authContext.userId },
          }
        );
        setOrdersList(responseData.data.orders);
      } catch (error) {
        console.log("[ERROR][GET][ORDERS] Get orders failed");
        console.log(error);
        return;
      }
    };

    fetchOrders();
  }, [authContext]);

  return <Orders items={ordersList} />;
};

export default PageOrders;
