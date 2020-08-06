import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = (props) => {
  const modal = (
    <React.Fragment>
      <Backdrop dismiss={props.cancel} />
      <div className="modal">{props.children}</div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal"));
};

export default Modal;
