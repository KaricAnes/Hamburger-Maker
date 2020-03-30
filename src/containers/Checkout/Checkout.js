import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import  { connect } from 'react-redux';
//import * as actionCreatorsOrdersA from '../../store/actions/index';

class Checkout extends Component {

/*state = {

    ingredients: null,
    totalPrice:null

}
*/
//--------------------------------------------------------------

//prihvacanje ingredienta iz BurgerBuildera
//moramo ih parsirati i iskoristiti
//Sa DidMount nije radilo, ne postavi state a nastavi dalje

//willMount
componentDidMount ()  {
  
  
//this.props.onPurchaseInit();




//this.props.location.search ne bi radilo da mije ucitana direktno preko rute

/*
const query = new URLSearchParams(this.props.location.search);
//?bacon=1&cheese=0&meat=0&salad=1&price=3
console.log(this.props);

//ingredients object preko kojeg cemo dobiti formu: salad:2, meat:1
const ingredients = {};
let price = 0;

//looping throught different query params
for(let param of query.entries()) {
//console.log(param)
//**********************TotalPrice

if(param[0] ==='price'){

  price= param[1];

}


//**********************TotalPrice
else{

  //['salad', '1']
//konvertovali smo u broj sa ovim plusem

ingredients[param[0]] = +param[1];

//param[0] -->salad  = param[1] --> 2
//ingredients: {bacon: 1, cheese: 0, meat: 0, salad: 1}

    }
  
                                 }

this.setState({ingredients:ingredients, totalPrice: price});*/


} 

//end mounta


//---------------------------------------------------------------------




CheckoutCancelledHandler = () => {

  this.props.history.goBack();

}


CheckoutContinuedHandler = () => {

  this.props.history.push('/checkoutt/contact-data');

}



  render(){



    //console.log(this.props.location.search);
    //console.log(this.props);


    let summary = <Redirect to = '/'/>

    if(this.props.ings) {
      //bit ce reelevantno samo ako su nam stigli ovi propsovi

      const purchasedRedirect = this.props.purchased? <Redirect to = '/' /> : null;

    summary = (

      <div>

      {purchasedRedirect}

    <CheckoutSummary
   ingredients = {this.props.ings/*this.state.ingredients*/}
   CheckoutCancelled = {this.CheckoutCancelledHandler}
   CheckoutContinued = {this.CheckoutContinuedHandler}/>

   </div>
      )

      
    }
    
    
    return (


        <div>

   
 {summary}



   <Route path =  {this.props.match.path + '/contact-data'} 
   //nested routing
   //this.props.match.path --> ne bismo mogli korsitiit da BurgeBuilder nije ucitan preko rute u App.js-u

   //Ne moramo vise korsititi withRouter nakon dodavanja Reduxa u ContactData.js
   //render = {() => (<ContactData ingredients = {this.state.ingredients} totalPrice = {this.state.totalPrice}/>)} />
   //vise ne moramo koristit trik iznad za slanje ingredienta i price-a u ContactData. Dobar primjer korsiti Reduxa
   component = {ContactData}/>

          </div>


      );
  }

}

//1. konfiguracija, subscription
const mapStateToProps = state => {
return {
ings: state.burgerBuilderR.ingredients,
//price: state.totalPrice
purchased: state.orderR.purchased
};


};


//2. konfiguracija akcije


/*const mapDispatchToProps = dispatch => {
  return{

onPurchaseInit: () => dispatch (actionCreatorsOrdersA.purchaseInit)
  }
}*/








//Evo primjera kada imamo samo 1. konfiguraciju. Kada nam akcije nisu potrebne. 
export default connect(mapStateToProps/*, mapDispatchToProps*/)(Checkout);