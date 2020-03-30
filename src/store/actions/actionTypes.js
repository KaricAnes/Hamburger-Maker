export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

//inicijalno setanje ingredientsa sa servera
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED';

//slanje narudzbe (ingredients, totalPRice, orderData) na server
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START'; // Za setanje Laoding u ContactDAta na true //orderA.js -> nije korsiteno
export const PURCHASE_INIT  = 'PURCHASE_INIT'; 

//dobijanje ordersa sa servera
export const FETCH_ORDERS_START = 'FETCH_ORDERS_STARTT';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

//submit button u Login Formi 
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT'; 

export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

export const INGREDIENT_PRICE =
{
meat : 1,
cheese : 0.5,
bacon : 0.5,
salad : 0.5
};

export const UPDATE_PORUCLJIVO_STATE = 'UPDATE_PORUCLJIVO_STATE';



