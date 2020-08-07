import React, { useState, useContext } from "react";
import axios from 'axios';

import AuthContext from '../Context/auth-context';
import Form from "../Components/Form/Form";
import Input from "../Components/Input/Input";

const PageAuth = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authContext = useContext(AuthContext);

  const changeNameHandler = (event) => setName(event.target.value);
  const changeEmailHandler = (event) => setEmail(event.target.value);
  const changePasswordHandler = (event) => setPassword(event.target.value);

  const switchHandler = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  const submitHandler = async () => {

    let response;
    try {
      if (isLogin) {
        response = await axios.post('http://localhost:5000/api/users/login', { email, password});
      } else {
        response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password});
      }
    } catch (error) {
      console.log("[ERROR][POST][USERS] Authentication failed.");
      console.log(error);
      return;
    }

    authContext.login(response.data.token, response.data.userId, response.data.userName);
  }

  let form;
  if (isLogin) {
    form = (
      <Form
        text="Login!"
        title="Connect to your account"
        auth={true}
        switch={switchHandler}
        mode={isLogin}
        submit={submitHandler}
      >
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your Email..."
          change={changeEmailHandler}
          value={email}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password..."
          change={changePasswordHandler}
          value={password}
        />
      </Form>
    );
  } else {
    form = (
      <Form
        text="Signup!"
        title="Create an account"
        auth={true}
        switch={switchHandler}
        mode={isLogin}
        submit={submitHandler}
      >
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name..."
          change={changeNameHandler}
          value={name}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email..."
          change={changeEmailHandler}
          value={email}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password..."
          change={changePasswordHandler}
          value={password}
        />
      </Form>
    );
  }

  return form;
};

export default PageAuth;
