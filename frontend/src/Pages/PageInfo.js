import React from "react";

import Input from "../Components/Input/Input";
import Form from "../Components/Form/Form";

const PageInfo = (props) => {
  return (
    <Form title="Personal Information" text="Save!">
      <Input
        type="text"
        id="name"
        label="Name"
        placeholder="Enter your name..."
      />
      <Input type="text" id="age" label="Age" placeholder="Enter your age..." />
      <Input
        type="text"
        id="address"
        label="Address"
        placeholder="Enter your address..."
      />
      <Input
        type="text"
        id="phone"
        label="Phone"
        placeholder="Enter your phone number..."
      />
    </Form>
  );
};

export default PageInfo;