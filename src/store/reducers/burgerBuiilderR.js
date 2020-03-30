import * as actionTypes from "../actions/actionTypes";


const initialState = {
  
  ingredients: null,
  totalPrice: 2, 
  error: false,
  building: false,     //setat cemo je na true kada kod add-amo ili remove-amo neki ingredient
 };                    //bitno za auth, redirektanje


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:

//ne trebamo break statements jer svakako imamo return za svaki case tako da se implementacija koda nece nastaviti dalje.

       return {
        
        //ovo ingredients je sada novi objekat.Mi sa njim sada zelimo overwritati odredjeni ingredient. A koji cemo overwritati ovisi
        //o payloadu.

        ingredients: {
          ...state.ingredients,
          //salad           :    //broj od starog ingredienta npr. 1   +1
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
          //overriding: sa ovim iznad smo overridali kopiju objekta: ...state.ingredients
        },

        totalPrice: state.totalPrice + action.val,
        building:true,
        //porucljivo: sum > 0
      };


    //  ne trebamo break statements jer svakako imamo return za svaki case tako da se implementacija koda nece nastaviti dalje.

    case actionTypes.REMOVE_INGREDIENT:
      /*const newArray2 = state.persons.filter(
        person => person.id !== action.personId
      );*/

      return {
          ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
         
        },
        totalPrice: state.totalPrice - action.val,
        building:true
      };

      case actionTypes.SET_INGREDIENTS: 

      return{
        ...state,
        //ingredients: action.ingredients,          //ingredients poticu iz burgerBuilderA setIngredients, mijenjamo poredak ingsa
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
          
        },
        error: false, 
        totalPrice: 2,
        building: false
          
      };
      
   case actionTypes.SET_INGREDIENTS_FAILED: 
     
      return{
        ...state,
        error:true
      }

    //Ako nije postavljen state ni preko jednog od ovih case-ova iznad. Onda ovaj stet ispod vraca initial state
    //ili onaj koji je bio i prije
    default:
      return state;
  };

  //Ako nije postavljen state ni preko jednog od ovih case-ova iznad. Onda ovaj stet ispod vraca initial state
  //ili onaj koji je bio i prije
  
};

export default reducer;
