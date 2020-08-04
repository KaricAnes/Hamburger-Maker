import React from "react";
import BuildControl from "./BuildControl/BuildContol";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salata", type: "salad" },
  { label: "Pećenica", type: "bacon" },
  { label: "Sir", type: "cheese" },
  { label: "Meso", type: "meat" },
  { label: "Kecap", type: "kecap" },
]; //types su isti kao u reduceru sto su properties u initialState-u koji pristignu iz fire-base-a

const buildControlls = (props) => {
  //debugger;

  //Namjernos smo stavili ove divove dole da bi smo mogli kontrolisati
  //styling
  return (
    <div className={classes.BuildControls}>
      <p>
        Trenutna Cijena: <strong>{props.price.toFixed(2)}</strong> KM
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          /* added = {props.addIngredientHandler}*/
          key={ctrl.label}
          label={ctrl.label}
          //type = {ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)} // ctrl.type --> ide u BurgerBuilder u akciju kao payload
          oduzet={() => props.ingredientOduzet(ctrl.type)} // ctrl.type --> ide u BurgerBuilder u akciju kao payload
          disabled={props.disabled[ctrl.type]} //disabledInfo = {salad: false, bacon: true, cheese: true, meat: true}  disabled = true/false
        />
      ))}

      <button
        onClick={props.purchaseHandler}
        disabled={!props.purchaseButtonEnabled} //true ili false
        className={classes.OrderButton}
      >
        {
          props.isAuth
            ? "ORDER NOW"
            : "SIGN UP TO ORDER" /*Idemo na Auth.js ili nam iskace modal. Definisano u purchasingHandler() u BurgerB */
        }
      </button>
    </div>
  );
};

export default buildControlls;
