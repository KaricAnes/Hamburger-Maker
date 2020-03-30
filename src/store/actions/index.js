//korsiteno u akcijama
//npr. onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),
//actionCreators.removeIngredient


export {
    addIngredient, 
    removeIngredient,
    fetchIngredients
    
    } from './burgerBuilderA';
 
export {
    purchaseBurger, //asinq kod --> samo prenosi jos akcija u sebi , a za njega licno nema case u reduceru, jer on ni nema svoj type

    purchaseInit,   //sinq kod  --> redirektanje nakon sto narudzba stigne na server --> ima sve u .txt-u obasjnejeno 


    fetchOrders //prenosi jos akcija u sebi, a za njega licno nema case u reduceru, jer on ni nema svoj type pa da ga mogu docekati 

} from './orderA';

export {
    auth, //prenosi jos akcija u sebi, a za njega licno nema case u reduceru, jer on ni nema svoj type pa da ga mogu docekati 
     logout,
      setAuthRedirectPath,
      authCheckState
} from './authA';