import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

//Cilj je dakle da priakzemo preview of our burger i onda da prikazemo continoue or cancel buttons.

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Nadamo se da ste zadovoljni ukusom!!!</h1>

      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        {/*Morali smo mu poslati ingredients jer ih ocekuje u Burger.js-u */}
        <Burger ingredients={props.ingredients} />
      </div>

      {/*Savrsen primjer reusinga jednog buttona */}
      <Button btntype="Danger" clicked={props.CheckoutCancelled}>
        ODUSTANI
      </Button>
      <Button btntype="Success" clicked={props.CheckoutContinued}>
        NASTAVI
      </Button>
    </div>
  );
};

export default checkoutSummary;
