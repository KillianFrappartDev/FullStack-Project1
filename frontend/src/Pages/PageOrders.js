import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Orders from '../Components/Orders/Orders';

// const DUMMY_ORDERS = [{
//     id: "o1",
//     date: "25/03",
//     product: "Shoes",
//     price: 50,
//     user: "John"
// },
// {
//     id: "o2",
//     date: "28/03",
//     product: "Watch",
//     price: 80,
//     user: "John"
// },
// {
//     id: "o3",
//     date: "30/03",
//     product: "Laptop",
//     price: 199,
//     user: "Max"
// }];

const PageOrders = props => {
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const responseData = await axios.get('http://localhost:5000/api/orders');
                setOrdersList(responseData.data.orders);
            } catch (error) {
                console.log("[ERROR][GET][ORDERS] Get orders failed");
                console.log(error);
                return;
            }
        }

        fetchOrders();
    }, [])

    return (<Orders items={ordersList} />);
}

export default PageOrders;