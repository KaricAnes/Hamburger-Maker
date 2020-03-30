import React, {Component}  from 'react';
import Order from '../../components/Order/Order';
import  { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
//import axios from '../../axios-orders';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {


//sada je preko reduxa 
/*state = {
    orders: [],
    loading:true

}*/


//fetching orders from server
componentDidMount() {

this.props.onFetchOrders(this.props.token, this.props.userId);

    //axios-orders.js --> base url

   /* axios.get('/orders.json')
    .then(response => {

    //vrati nam sirovi objekat u kojem imamo keyeve i values
    //keyevi su jedinstvena imena koja je efirebase generisao
    // a values su customer, ingredients itd... 
    //moramo ga pretvoriti u array:
/*
{-Lu8OsGMNBtq4mnkYrCD: {…},
 -Lu8Ow_zsEDS7Aoipy4d: {…},
  -Lu8pT0ic6AEW9deZY8d: {…},
  -LuXVqMVA_WI7wxMj4NS: {…},
   -LuXYY3G-i-0-IRZHVCw: {…}, …}

*/
//u konzoli vidimo objekat
/*console.log( response.data);




    const fetchedOrders = [];

    for (let key in response.data) {
        fetchedOrders.push({
            //novi objekat cemo pushati, ne stari
            ...response.data[key],
            id:key*/
            //sada imamo array pun order objekata koji imaju i svoje id-eve
            //key: -Lu8OsGMNBtq4mnkYrCD ime objekta
            //...response.data[key]: ingredients, orderData,  price
            //key lijevo, data[key] desni podaci 
         
            
      //  });
         // console.log('response.data: ' + response.data);
         // u konzoli vidimo array
         //console.log('response.data[key]: ' + response.data[key]); ---
       //console.log('key: ' + key);
      //console.log('fetchedOrders: ' + fetchedOrders); ---
    //}
    /*
   
        this.setState({loading: false,  orders: fetchedOrders});
        //console.log(this.state.orders);
    })
    .catch(err => {
        this.setState({loading: false});
    })*/
    
    
}
//Outputting orders

render() {

let orders = <Spinner/>

if(!this.props.loading){

    orders =  this.props.orders.map(order => (

        <Order
        key = {order.id}
        ingredients = {order.ingredients}
        /*to fixed() nije radilo dok nisam dodao ovaj plus koji ga pretvara u number */
        price = {+order.price}
        />
        
        ))
}

 return(

<div>

{orders}

</div>


 );

}
}




//1. konfiguracija


const mapStateToProps = state => {
    return{
      
     loading: state.orderR.loading,
     orders: state.orderR.orders,
     token: state.authR.token,
     userId: state.authR.userId
    };
  };




//2. konfiguracija 

const mapDispatchToProps = dispatch => {
return {
    onFetchOrders: (token, userId) => dispatch (actionCreators.fetchOrders(token, userId))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);