import * as actionTypes from "../actions/actionTypes";

const initialState = {
  //najvise komunicira sa ContactData.js i Orders.js ali i saBurgerBuilder.js npr. purchased setanje na false
  orders: [], //
  loading: false, //prikazujemo spinner umjesto forme u ContactData ako je true, i u Orders.js za fetchanje dosadasnjih naruddzbi
  purchased: false, //redirektanje sa checkouta na pocetnu kada se narudzba uspjesno izporuci na server
};

const reducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    //Proces Porucivanja (kad narudzbe saljemo na server)**********************************************************************************

    case actionTypes.PURCHASE_BURGER_START:
      //debugger;
      return {
        ...state,
        loading: true, //setamo loading na true i prikazujemo spinner umjesto forme u ContactData
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      //debugger;
      const newOrder = {
        ...action.orderData,
        id: action.orderID, // zelimo unutar jednog objekta imati orderID i orderData merganje
        /*
        newOrder: {
        id: "-MCgKnpzYqMg0DPHdDQ_"  //orderID stigne sa servera preko responsa purchaseBurger() akcija iz orderA.js
        ingredients: {bacon: 1, cheese: 1, kecap: 0, meat: 1, salad: 1}
        orderData - formData: {country: "d", deliveryMethod: "fastest", email: "a.kWW@gmail.com", name: "d", street: "d", …}
        price: 4.5
        userId: "gbAXYe9qNEOmHoPI0ePSI1Ia9tF2"
        }
        */
      };

      return {
        ...state,
        loading: false, //setamo laoding na false jer smo uspjesno poslali narudzbu na server
        purchased: true, //redirektanje sa checkouta na pocetnu kada se narudzba uspjesno izporuci na server
        orders: state.orders.concat(newOrder), //concat vraca novi array i zato smo ovo dodali immutably

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
        loading: false,
      };

    case actionTypes.PURCHASE_INIT: //vraca purchased na false, da ne bismo bili onemoguceni da udjemo na checkout nakon jedne uspjesne narudzbe
      return {
        //okida se u porucivanjeContinueHandler() u burgerBuilderR tik prije bacanja sa modala na checkout ----> this.props.onPurchaseInit();
        ...state,
        purchased: false,
      };
    //Proces Porucivanja (kad narudzbe saljemo na server)**********************************************************************************

    //Proces povlacenja svih ordersa sa backenda  (kad narudzbe dolaze sa servera)********************************************************************

    case actionTypes.FETCH_ORDERS_START:
      debugger;
      return {
        ...state,
        loading: true, //reusing propertija za spinner, korsiten je u gornjem u bolum u akciji
      }; //koristimo ga u Orders.js kada idemo na server po narudzbe

    case actionTypes.FETCH_ORDERS_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false, //setamo loading na false jer smo uspjesno dohvatili orderse sa servera
        orders: action.orders, //action.orders dolazi iz actionCreatora orderR.js: fetchOrdersSuccess
        //action.orders su vec tamo transformisani i u formi su: Array of obejcts [{id, ings, price...},{...}]
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      debugger;
      return {
        ...state,
        loading: false,
      };

    //Proces povlacenja svih ordersa sa backenda (kad narudzbe dolaze sa servera)**********************************************************************************

    default:
      return state;
  }
};

export default reducer;
