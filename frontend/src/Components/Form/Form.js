import React from 'react';

import Button from '../Button/Button';
import './Form.css';

const Form = props => {
    const submitHandler = event => {event.preventDefault()};

    return (
        <form className="form" onSubmit={submitHandler}>
            <h1 className="form__title">{props.title}</h1>
            {props.children}
            <Button text={props.text} />
            {props.auth && props.mode && <p className="form__auth">You don't have an account ? Click <span className="form__auth-switch" onClick={props.switch}>HERE</span> to signup instead!</p>}
            {props.auth && !props.mode && <p className="form__auth">Already a member ? Click <span className="form__auth-switch" onClick={props.switch}>HERE</span> to login instead!</p>}
        </form>
    );
}

export default Form;