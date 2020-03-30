import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

 const INGREDIENT_PRICE =
{
meat : 1,
cheese : 0.5,
bacon : 0.5,
salad : 0.5
}


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:name,
        //ingredientName se mora podudarati sa onim ingredientName u reduceru u switchu   action.ingredientName
        val: INGREDIENT_PRICE[name]  //val mi je bita za cijenu
    };
};


export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:name,
        //ingredientName se mora podudarati sa onim ingredientName u reduceru u switchu   action.ingredientName
        val: INGREDIENT_PRICE[name]  //val mi je bita za cijenu
    };
};



//sinq kod
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:  ingredients //updatedResult
    };
   


}


export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
           };
   }






//postavljanje ingredinetsa inicijalno

export const fetchIngredients = () => {
   return dispatch => {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
    axios.get('https://react-moj-hamburger.firebaseio.com/ingredients.json')
    .then(response => {
        dispatch(setIngredients(response.data));
    })
    .catch(error => {
        dispatch(setIngredientsFailed());
    });


}}