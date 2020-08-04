//import actionTypes from './actionTypes';
import axios from "../../axios-orders";

//-----------------------------------------------------proces narucivanja
//sinq

export const purchaseBurgerSuccess = (id, orderData) => {
  ////debugger;
  return {
    type: /*actionTypes.PURCHASE_BURGER_FAILED,*/ "PURCHASE_BURGER_SUCCESS",
    orderID: id, //orderID: "-MCgLRJDOBgJ0xFVHdv5"   ovo je orderID of a newly created order
    orderData: orderData, // orderData potice iz ContactData.js iz orderHandler-a - u njemu se okida akcija purchaseBurger u kojoj se nalazi i ova success
  };
};

//sinq

export const purchaseBurgerFailed = (error) => {
  return {
    //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
    type: "PURCHASE_BURGER_FAIL",
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  ////debugger;
  return {
    type: "PURCHASE_BURGER_START", //setamo loading na true i prikazujemo spinner umjesto forme u ContactData
  };
};

/*
orderData:

ingredients: {kecap: 0, salad: 1, bacon: 1, cheese: 1, meat: 1}
orderData: {name: "d", street: "d", zipCode: "11111", country: "d", email: "a.kWW@gmail.com", …}
price: 4.5
userId: "gbAXYe9qNEOmHoPI0ePSI1Ia9tF2"    //userId: state.authR.userId, na osnovu njega prikazemo useru samo njegove narudzbe 
*/
//token: "iI6InBhc3N3b3JkInfddffffffffffffffffffffffffffffffffddffddfghghhgerrtrww"
//asinq + 2 sinq-a

export const purchaseBurger = (orderData, token) => {
  //kada kliknemo na order Button treba da se izvrsi
  //orderHandler() u ContactData.js
  return (dispatch) => {
    ////debugger;
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData) //token ukraden iz ContactData, this.props.onOrderBurger(narudzba, this.props.token);
      .then((response) => {
        ////debugger;
        console.log(response.data); //data: {name: "-MCgLRJDOBgJ0xFVHdv5"}   ovo je orderID
        dispatch(purchaseBurgerSuccess(response.data.name, orderData)); //kada nam dodje response sa servera
      })
      .catch((error) => {
        ////debugger;
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  //setta purchased na false da ne bismo bili onemoguceni da udjemo na checkout
  return {
    type: "PURCHASE_INIT", //burgerBuilder porucivanjeContinoueHandler(tik prije klika na continue u modalu)
  };
};
//-----------------------------------------------------proces narucivanja

//-------------------------------------------------povlacenje ordersa sa servera

export const fetchOrdersSuccess = (orders) => {
  //debugger;
  /*
  orders[
    {
id: "-MCqw5i8QspVXsWqlsmz"
ingredients: {bacon: 1, cheese: 1, kecap: 0, meat: 0, salad: 1}
orderData: {country: "bih", deliveryMethod: "fastest", email: "a.k@gmail.com", name: "f", street: "f", …}
price: 3.5
userId: "dSfmP8KgsnVhS9ZNQ1lyT5EM5d73"
    },
    {
      ...
    }
  ]
  */
  return {
    //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
    type: "FETCH_ORDERS_SUCCESS",
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  //debugger;
  return {
    //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
    type: "FETCH_ORDERS_FAIL",
    error: error,
  };
};

export const fetchOrdersStart = () => {
  //debugger;
  return {
    type: "FETCH_ORDERS_STARTT", //sluzi nam da mozemo doci do reducera i setati loading na true
  };
};

//asinq kod za povlacenje ordersa sa backenda, u sebi ima i dva sinq koda
//on nam je u neku ruku nepotreban ako cemo poruciti narudzbu i odmah gledati u orders.js
//ako cemo refrshovati starnicu, onda cemo izgubiti sve podatke sa reduxa i local state-a
//tako da onda moramo sa backanda da povlacimo podatke
//okida se u Orders.js u componentDidMount-u
export const fetchOrders = (token, userId) => { //token smo dobili iz Orders.js iz componentDidMount() a mogao sam koristiti i  getState
  return (dispatch) => {
    //debugger;
    dispatch(fetchOrdersStart()); //setamo laoding na true u OrderR.js-u i prikazujemo spinner umjesto orders-a u Orders.js

    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams) //auth se mora podudarati sa auth u rules u firebase-u

      .then((response) => {
        //debugger;
        //--------------------------transforminfData
        const fetchedOrders = [];

        for (let key in response.data) {
          //response.data: //data:{MCqw5i8QspVXsWqlsmz{ingredients:{}, price:3.6 itd...},{MCqw5i8QspVXsWqlsmz{ingredients:{}, price:3.6 itd...} }
          //debugger;
          fetchedOrders.push({
            ...response.data[key],
            id: key, //ovaj id ce nam biti key za svaku narudzbu   "-MCqw5i8QspVXsWqlsmz"
            /*
            fetchedOrders [{
            id: "-MCqw5i8QspVXsWqlsmz"
            ingredients: {bacon: 1, cheese: 1, kecap: 0, meat: 0, salad: 1}
            orderData: {country: "bih", deliveryMethod: "fastest", email: "a.k@gmail.com", name: "f", street: "f", …}
            price: 3.5
            userId: "dSfmP8KgsnVhS9ZNQ1lyT5EM5d73"
            }]
            */
          });
        }
        //--------------------------transformingData

        dispatch(fetchOrdersSuccess(fetchedOrders)); //kada nam dodju ordersi okinemo ovu funkciju, fetchedOrders su transformed iznad
        //debugger;
      })
      .catch((err) => {
        //debugger;
        dispatch(fetchOrdersFailed(err));
      });
  };
};

//-------------------------------------------------ordersi dolaze sa servera
