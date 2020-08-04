import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
  meat: 1,
  cheese: 0.5,
  bacon: 0.5,
  salad: 0.5,
  kecap: 0.3,
};

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
    //ingredientName se mora podudarati sa onim ingredientName u reduceru u switchu   action.ingredientName
    val: INGREDIENT_PRICE[name], //val mi je bita za cijenu
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
    //ingredientName se mora podudarati sa onim ingredientName u reduceru u switchu   action.ingredientName
    val: INGREDIENT_PRICE[name], //val mi je bita za cijenu
  };
};

//sinq kod
export const setIngredients = (ingredients) => {
  //debugger;
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const setIngredientsFailed = () => {
  return {
    type: actionTypes.SET_INGREDIENTS_FAILED, //seta error na true u reduceru ako se desi greska u fetchIngredients
  };
  /*
//BurgerBuilder error
let burger = this.props.error ? (
      <p>Sastojci ne mogu biti učitani!</p>
    ) : (
      <Spinner />
    );
*/
};

//postavljanje ingredinetsa inicijalno

export const fetchIngredients = () => {
  return (dispatch) => {
    //debugger;
    //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod zahvaljuci promisu
    axios
      .get("https://react-moj-hamburger.firebaseio.com/ingredients.json")
      .then((response) => {
        //debugger;
        dispatch(setIngredients(response.data));
        //debugger;
      })
      .catch((error) => {
        dispatch(setIngredientsFailed());
      });
  };
};
