import React, { useState } from "react";

import Form from "../Components/Form/Form";
import Input from "../Components/Input/Input";

const PageAuth = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchHandler = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  let form;

  if (isLogin) {
    form = (
      <Form
        text="Login!"
        title="Connect to your account"
        auth={true}
        switch={switchHandler}
        mode={isLogin}
      >
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your Email..."
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password..."
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
      >
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name..."
        />
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email..."
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password..."
        />
      </Form>
    );
  }

  return form;
};

export default PageAuth;
