import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button onClick={props.click} className={`button ${props.size || "button-medium"} ${props.color}`}>{props.text}</button>
    );
}

export default Button;