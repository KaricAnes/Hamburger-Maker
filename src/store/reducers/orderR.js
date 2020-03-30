import * as actionTypes from "../actions/actionTypes";

const initialState = {

  orders: [],
  loading: false,         //postat ce true kada krenemo sa laodingom
  purchased: false      //redirektanje sa checkouta na pocetnu kada se narudzba zavrsi 
   
};


const reducer = (state = initialState, action) => {
  switch (action.type) {


//Proces Porucivanja (kad narudzbe idu na server)**********************************************************************************

    case actionTypes.PURCHASE_BURGER_START:
        return{
         ...state, 
         loading:true
        };



    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        //orderData: action. OrderData    // orderData i orderID nam stizu iz orderA.js-a. I moraju se podudarati imena.
        ...action.orderData,
        id: action.orderID                                 //takodjer zelimo unutar jednog objekta imati orderID i orderData
                                           //to cemo postici preko ove konstante iznad i concata koji spaja dva arraya
        };

      return {
        ...state,
        loading: false,
        purchased: true, //redirekt na homePage
        orders: state.orders.concat(newOrder) //concat vraca novi array i zato smo ovo dodali immutably
        

/*
concat vraca novi array koji je stari array plus argument koji dodamo u concat,
concat je immutable way updajtovanja arraya by adding an item.
* push manipulira sa originalnim value-om, sa pushom bismo dirali originalne results propertije u originalnom state-u cak i sa 
spread operatorima. Push se ne preporucuje u ovim slucajevima nikako.


*/



      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false 
      }
//Proces Porucivanja (kad narudzbe idu na server)**********************************************************************************





//Proces povlacenja svih ordersa sa backenda  (kad narudzbe dolaze sa servera)********************************************************************

case actionTypes.FETCH_ORDERS_START:
        return{
         ...state, 
         loading:true  //reusing propertija za spinner, korsiten je u gornjem u bolum u akciji 
        };


case actionTypes.FETCH_ORDERS_SUCCESS:

    
    return {
      ...state,
      loading: false,
      orders: action.orders //action.orders dolazi iz actionCreatora orderR.js: fetchOrdersSuccess
                            //action.orders su vec tamo transformisani i u formi su: Array of obejcts
    };


    case actionTypes.FETCH_ORDERS_FAIL:
        return {
          ...state,
          loading: false
        };


//Proces povlacenja svih ordersa sa backenda (kad narudzbe dolaze sa servera)**********************************************************************************





    default:
      return state;
  }
};

export default reducer;
