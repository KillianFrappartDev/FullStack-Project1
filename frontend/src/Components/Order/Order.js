import React from 'react';

import './Order.css';

const Order = props => {
    return (
        <div className="order">
          <h3>{props.date}</h3>
          <h3>{props.product}</h3>
          <h3>{props.price + "$"}</h3>
          <h3>{props.user}</h3>
        </div>
    );
}

export default Order;