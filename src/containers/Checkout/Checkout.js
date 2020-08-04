import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
//import * as actionCreatorsOrdersA from '../../store/actions/index';

class Checkout extends Component {
  /*state = {

    ingredients: null,
    totalPrice:null

}
*/

  CheckoutCancelledHandler = () => {
    //button u CheckoutSummary za otkazivanje narudjbe, vraca nas na BurgerBuilder.js
    this.props.history.goBack();
  };

  CheckoutContinuedHandler = () => {
    //button u CheckoutSummary za nastavak narudjbe, ucitava contactData
    this.props.history.push("/checkoutt/contact-data");
  };

  render() {
    let summary = null;

    if (this.props.ings) {
      //bit ce reelevantno samo ako su nam stigli ovi propsovi

      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}

          <CheckoutSummary
            //CheckoutSummary je burger i ispod njega dva buttona za continoue i cancel
            ingredients={this.props.ings /*this.state.ingredients*/}
            CheckoutCancelled={this.CheckoutCancelledHandler}
            CheckoutContinued={this.CheckoutContinuedHandler}
          />
        </div>
      );
    }

    return (
      <div>
        {summary}

        <Route
          path={this.props.match.path + "/contact-data"}
          //nested routing
          //this.props.match.path --> ne bismo mogli korsitiit da BurgeBuilder nije ucitan preko rute u App.js-u

          //Ne moramo vise korsititi withRouter nakon dodavanja Reduxa u ContactData.js
          //render = {() => (<ContactData ingredients = {this.state.ingredients} totalPrice = {this.state.totalPrice}/>)} />
          //vise ne moramo koristit trik iznad za slanje ingredienta i price-a u ContactData. Dobar primjer korsiti Reduxa
          component={ContactData}
        />
      </div>
    );
  }
}

//1. konfiguracija, subscription
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderR.ingredients,
    //price: state.totalPrice
    purchased: state.orderR.purchased, //rediraktanje na homePage ako je narudzba uspjesno otisla na server
  };
};

//Evo primjera kada imamo samo 1. konfiguraciju. Kada nam akcije nisu potrebne.
export default connect(mapStateToProps)(Checkout);
