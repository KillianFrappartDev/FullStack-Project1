import React from 'react';

import Order from '../Order/Order';
import './Orders.css';

const Orders = props => {
    return (
      <div className="orders">
        <div className="order primary-bg">
          <h3>Date</h3>
          <h3>Product</h3>
          <h3>Price</h3>
          <h3>User</h3>
        </div>
        {props.items.map((item) => (
          <Order
            date={item.date}
            product={item.product}
            key={item.id}
            price={item.price}
            user={item.user}
          />
        ))}
      </div>
    );
}

export default Orders;