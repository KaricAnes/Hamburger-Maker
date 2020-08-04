import React from "react";
import classes from "./Input.module.css";

//importovan je u Auth.js i ContactData.js
//predstavlja single input, textArea ili select u zavisnosti od elementType-a koji stize preko propsa

const input = (props) => {
  /*
  props:{  //iz Auth.jS
changed: event => this.inputChangedHandler(event, formElement.id)  --> formElement.id --> mail ili password
elementConfig: {type: "email", placeholder: "Mail Adresa"}
elementType: "input"
invalid: true
shouldValidate: {required: true}
touched: false
value: ""
  }
*/

  let inputElement = null;
  //<input type="text" name="fname" placeholder="First name">

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  debugger;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      debugger;
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    /*<select name="carlist" form="carform">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    </select> */

    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
