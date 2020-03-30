//import actionTypes from './actionTypes';
import axios from '../../axios-orders';

//-----------------------------------------------------proces narucivanja
//sinq

export const purchaseBurgerSuccess = (id, orderData) => { //id of a newly created order
    return  {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
     type :  /*actionTypes.PURCHASE_BURGER_FAILED,*/  'PURCHASE_BURGER_SUCCESS',
     orderID: id,  //mora se poklapati sa reducerom
     orderData: orderData   //mora se poklapati sa reducerom
 
 
 }}; 

//sinq

 export const purchaseBurgerFailed = (error) => {
    return  {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
     type: 'PURCHASE_BURGER_FAIL',
     error: error
  
 }};


export const purchaseBurgerStart = () => {
    return {
        type: 'PURCHASE_BURGER_START' //sluzi nam da mozemo doci do reducera 
    }

}

 //asinq + 2 sinq-a

 export const purchaseBurger = (orderData, token) => {      //kada kliknemo na order Button treba da se izvrsi
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+ token, orderData ) //token ukraden iz ContactData
        .then(response => {
            console.log(response.data); //da vidimo jesmo li dobili id
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
          });
        
          

    };
 };



 export const purchaseInit = () => {
    return {
        type: 'PURCHASE_INIT' 
    }

 }
//-----------------------------------------------------proces narucivanja




//-------------------------------------------------povlacenje ordersa sa servera

export const fetchOrdersSuccess = (orders) => { //id of a newly created order
    return  {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
     type :   'FETCH_ORDERS_SUCCESS',
     orders: orders
  
 }}; 

 export const fetchOrdersFailed = (error) => {
    return  {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
     type: 'FETCH_ORDERS_FAIL',
     error: error
  
 }};

 export const fetchOrdersStart = () => {
    return {
        type: 'FETCH_ORDERS_STARTT' //sluzi nam da mozemo doci do reducera 
    }

}


//asinq kod za povlacenje ordersa sa backenda, u sebi ima i dva sinq koda
 export const fetchOrders = (token, userId) => {      
    return dispatch => {
        dispatch(fetchOrdersStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)  //auth se mora podudarati sa auth u rules u firebase-u

        .then( response => {
       
            //--------------------------transforminfData
            const fetchedOrders = []; 

            for (let key in response.data) {
                fetchedOrders.push({
                    //novi objekat cemo pushati, ne stari
                    ...response.data[key],
                    id:key
                   
                 
                    
                });
                
            }
            //--------------------------transformingData
            
            dispatch (fetchOrdersSuccess(fetchedOrders)) //kada nam dodju ordersi okinemo ovu funkciju, fetchedOrders su transformed iznad

            })
            .catch(err => {

              dispatch(fetchOrdersFailed(err));

            })
        
        }
        
        }   
 
 

 //-------------------------------------------------ordersi dolaze sa servera