import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button className={`button ${props.size || "button-medium"}`}>{props.text}</button>
    );
}

export default Button;