import React from "react";
import classes from "./Button.module.css";

const button = (props) => (
  <button
    //Mi uvijek zelimo dodijeliti button, ali danger i success samo uslovno
    //Ono sto proslijedimo u className mora biti String, sada trenutno je array Of Strings. Zato smo dodali .join
    disabled={props.disabled}
    className={[classes.Button, classes[props.btntype]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
