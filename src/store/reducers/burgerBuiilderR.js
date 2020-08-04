import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false, //setat cemo je na true kada kod add-amo ili remove-amo neki ingredient. Bitna zbog redirekta nakon sto skliknemo na submit u Auth.js-u. Ako je building false, idemo nazad na BurgerBuiklder.js
}; //nalazi se u BurgerBuilder.js-u u mapStateToProps-u

/*
Since reducers are pure functions they do not mutate the original state.
 Instead, they return the updated state in a new object. */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      //ne trebamo break statements jer svakako imamo return za svaki case tako da se implementacija koda nece nastaviti dalje.
      //debugger;
      return {
        ...state,
        ingredients: {
          ...state.ingredients, //arguments on the right side, override arguments on the left side
          //salad           :    //broj od starog ingredienta npr. 1   +1
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          //overriding: sa ovim iznad smo overridali kopiju objekta: ...state.ingredients
        },
        totalPrice: state.totalPrice + action.val, //burgerBuilderA.js --> action.val
        building: true,
        //porucljivo: sum > 0
      };

    //  ne trebamo break statements jer svakako imamo return za svaki case tako da se implementacija koda nece nastaviti dalje.

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - action.val,
        building: true,
      };

    case actionTypes.SET_INGREDIENTS:
      //mozemo ga koristiti da resetujemo nas burger
      //postavlja ingredinetse inicijalno sa servera, dakle sve na 0
      //odredjuje kakav ce biti poredak u ingredientsima kad ih bildamo poslije
      //burgerBuilderA: fetchIngredients
      return {
        ...state,
        //ingredients: action.ingredients,//ingredients poticu iz burgerBuilderA setIngredients, mijenjamo poredak ingsa
        ingredients: {
          //ovdjeee
          kecap: action.ingredients.kecap,
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 2, //nakon sto porucimo uspjesno burger, i budemo redirektani na homePage, zelimo da se i nasa cijena vrati na 2
        /*building: false,*/
      };

    case actionTypes.SET_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    //Ako nije postavljen state ni preko jednog od ovih case-ova iznad. Onda ovaj stet ispod vraca initial state
    //ili onaj koji je bio i prije
    default:
      return state;
  }
};

export default reducer;
