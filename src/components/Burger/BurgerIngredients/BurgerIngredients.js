import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredients = (props) => {
  //debugger;

  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      //debugger;
      ingredient = <div className={classes.BreadBottom}></div>;
      break;

    case "bread-top":
      //debugger;
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;

    case "meat":
      //debugger;
      ingredient = <div className={classes.Meat}></div>;
      break;

    case "cheese":
      //debugger;
      ingredient = <div className={classes.Cheese}></div>;
      break;

    case "salad":
      //debugger;
      ingredient = <div className={classes.Salad}></div>;
      break;

    case "bacon":
      //debugger;
      ingredient = <div className={classes.Bacon}></div>;
      break;

    case "kecap":
      //debugger;
      ingredient = <div className={classes.Kecap}></div>;
      break;

    default:
      ingredient = null;
  }

  return ingredient;
};

burgerIngredients.propTypes = {
  // click: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default burgerIngredients;
