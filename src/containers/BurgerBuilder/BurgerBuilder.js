import React, { Component } from "react";
import Auxic from "../../hoc/Auxic/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControlls";
import Modal from "../../components/UI/Modal/Modal";
import ModalOrderSummary from "../../components/Burger/ModalOrderSummary/ModalOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";
//import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
//import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component {
  //Stara sintaksa, moze se i ovako state postavljati
  //constructor(props) {
  //  super(props);
  //this.state = {...}

  //}

  state = {
    //ingredients: null,
    /*ingredients2: [
      'salad', 'bacon', 'bacon'
    ],*/
    /*ingredients: {
    
    salad:0,
    bacon:0,
    cheese:0,
    meat:0
       
    },*/
    //totalPrice: 2,
    //ingredients i total price su samo prebaceni na redux iz ovog state-a
    //ostali su local UI state i nema potrebe da ih prebacujemo na redux
    porucljivo: false /*Poruci Button */,
    modalVisibility: false, //conditionally displaying modal, Local UI state managment
    /*loading: false, //spinner
    error: false,*/
    //burgerVisibility: true,
  };

  /*  7.2) u state-u u BurgerBuilder.js-u ingredients su bili null. Ali su postavljeni sa servera u
 **componentDidMount()**. Eh posto nismo jos ucili kako da radimo sa asynchronous kodom u reduceru,
to cemo za sada zakomentarisati i poslije se nekad vratiti na to. Sad za sad cemu reduceru state-u postaviti. */

  //sada se logika ovog koda ispod nalazi u burgerBuilderA.js-- u actionCreatoru

  componentDidMount() {
    //debugger;
    this.props.onInitIngredients();

    /* axios.get('https://react-moj-hamburger.firebaseio.com/ingredients.json')
    .then(response => {
        this.setState({ingredients: response.data});
       // console.log(response.data);
    })
    .catch(error => {
      this.setState({error: true})
    });*/
  }

  purchaseButtonEnability() {
    //sumOfOfObjectValues.js
    //zbir value-a od svakog ingredienta da li je > 0 radi order buttona
    const { ings } = this.props; //{bacon: 0, cheese: 0, kecap: 0, meat: 0}
    const sum = Object.keys(ings) //[bacon, cheese, keacap, meat]: Ovo je uradjeno da bi mogao doci do igKeya a to je salad npr. i onda napisati ings[igKey]
      .map((igKey) => {
        debugger;
        return ings[igKey]; //sum = [0, 1, 0, 0, 1]  map pravi novi array na immutable way AllValuesFromObj.js
      })
      .reduce((sum, el) => {
        //0, 1
        return sum + el;
      }, 0);

    return sum > 0;
    //porucljivo ce postati true ako je suma veca od 0
  }

  //Da bismo dodali novi ingredient, prvo moramo znati koliko ih trenutno ima

  /*addIngredientHandler = type => {
    //ovo type nam dolazi iz BuildControls
    //Preko njega znamo sa kojim tacno sastojkom i buttonom radimo, a ujedno preko njega dodjemo
    //i do value-a od odrdjenog key-a preko odredjene notacije (dvije muhe 1im udarcem)

    const oldCount = this.state.ingredients[type];
    //console.log('ingredients[type]' + this.state.ingredients[type]); 0

    const updatedCount = oldCount + 1;

    //Kaze lik da State treba biti updajtovan na immutable way
    //Kreirali smo novi JS objekat i koristili smo ES6 spread operator
    //da distribuiramo properties prijasnjih ingredientsa

    const updatedIngredients = {
      ...this.state.ingredients
    };

    //ovo ispod je kako ne treba updajtovati objekat
    //const updatedIngredients = this.state.ingredients;

    updatedIngredients[type] = updatedCount;

    //cijena
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //Tek nakon dva dodana order button bude enabled
    //greska je u tome sto dobijamo zastarjelu a ne updajtovanu verziju
    this.purchaseButtonEnability(updatedIngredients);
  };*/

  //Morali smo staviti type, jer metoda mora znati sta tacno brise

  /*removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    //salad npr bude -1, i kako cemo predstaviti u arrayu nesto cega nema
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    //cijena
    const priceDeduction = INGREDIENT_PRICES[type];
    console.log("INGREDIENT_PRICES[type]: " + INGREDIENT_PRICES[type]);

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.purchaseButtonEnability(updatedIngredients);
  };*/

  //okida se kada kliknemo na Order Now ili na SignIN/SignUP button ispod BuildControls
  purchaseHandler = () => {
    //orderNow button/SIGN IN SIGN UP button
    if (this.props.isAuth) {
      this.setState({ modalVisibility: true }); //ako smo authenticated: zelimo da vidimo modal, poslije modala da idemo na checkout
    } else {
      this.props.onSetAuthRedirectPathBB("/checkoutt"); //ne mozemo kliknuti na button ako nismo bildali. Zelimo da se autentifikujemo pa da idemo na checkout odmah. A ne da opet idemo nazad na bildanje burgera.
      this.props.history.push("/auth"); //logicno zelimo da se autentifikujemo da bismo mogli poruciti
      //<Redirect to = '/auth'/> ne radi
    }
  };

  modalCancelHandler = () => {
    this.setState({ modalVisibility: false });
  };

  modalContinueHandler = () => {
    this.props.onPurchaseInit(); ////setta purchased na false da ne bismo bili onemoguceni da udjemo na checkout
    this.props.history.push({
      pathname: "/checkoutt", //baca nas sa Modala na Checkout kada kliknemo Continoue
    });
  };

  render() {
    //debugger;
    //LessButtonsDisabling.js
    const lessButtonsEnability = {
      ...this.props.ings, //this.state.ingredients
    };

    for (let key in lessButtonsEnability) {
      lessButtonsEnability[key] = lessButtonsEnability[key] <= 0; //ako je {salad: 0} onda ce biti {salad:true}, bit ce dakle disabled
      //lessButtonsEnability = {salad: false, bacon: true, cheese: true, meat: true}
    }

    let summary = null;

    let burger = this.props.error ? (
      <p>Sastojci ne mogu biti učitani!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      //this.state.ingredients
      burger = (
        <Auxic>
          <Burger ingredients={this.props.ings} />

          <BuildControls
            ingredientAdded={this.props.onAddIngredient} //this.addIngredientHandler --> iz buildControls type stize
            ingredientOduzet={this.props.onRemoveIngredient} //this.removeIngredientHandler --> iz buildControls type stize
            disabled={lessButtonsEnability} //lessButtonsEnability = {salad: false, bacon: true, cheese: true, meat: true}
            price={this.props.totPrice}
            purchaseButtonEnabled={this.purchaseButtonEnability()} //porucljivo je true ili false (0 ings values)  da nema ove () zagrade, ne bi se nikad okinuo
            purchaseHandler={this.purchaseHandler} //odlucujemo gdje cemo nakon sto kliknemo order button => na /auth pa na checkout ili na summaryCheckout(modal)
            isAuth={this.props.isAuth} //Odlucujemo hoce li pisati ORDER NOW ili SIGN UP TO ORDER na buttonu koji je ispod build controls (MAnje, vise)
          />
        </Auxic>
      );

      summary = ( //summary je modal koji iskoci kada kada bildamo burger i kada smo vec auth
        <ModalOrderSummary
          ingredients={this.props.ings} //this.state.ingredients
          modalCanceledHandler={this.modalCancelHandler} //kada se okine nas state postaje modalVisibility: false i modal bjezi sa ekrana
          modalContinueHandler={this.modalContinueHandler} //kada se okine baca nas sa modala na checkout
          summaryCijena={this.props.totPrice}
        />
      );
    }

    if (this.state.loading) {
      summary = <Spinner />;
    }

    return (
      <Auxic>
        <Modal
          show={this.state.modalVisibility} //ako je true, modal ce biti vidljiv
          modalClosed={this.modalCancelHandler}
        >
          {summary /*summary je modal ili spinner, children u modal-u */}
        </Modal>

        {burger}
      </Auxic>
    );
  }
}

//1. konfiguracija
//subscription

const mapStateToProps = (state) => {
  //debugger;
  return {
    ings: state.burgerBuilderR.ingredients,
    totPrice: state.burgerBuilderR.totalPrice,
    error: state.burgerBuilderR.error,
    isAuth: state.authR.token !== null,
    building: state.burgerBuilderR.building,
  };
};

//2. konfiguracija

//Akcije salju podatke na reducer.js
//Salju mu type i ostale propertije(optional)

const mapDispatchToProps = (dispatch) => {
  //debugger;
  return {
    //returnat cemo JS objekat u kojem mozemo definisati neke prop names
    //koji ce cuvati u sebi reference to a function koja ce biti executana da izvrsi action
    //Mozemo izabraty prop name po zelji
    //sada ovaj prop cuva value, a taj value treba da bude anonymus function
    //ova funkcija ce od sada biti dostupna preko ovog prop name-a: onIncrementCounter
    //Mi sada ovu prop: onIncrementCounter mozemo vezati npr. za onClick() neki. I kada god kliknemo na
    //njega, ova dispatch funkcija ce se okinuti.
    //ovo type imam objasnjeno u redux-basics.js
    //Sa typom sam dobio property increment npr., koji mugu koristiti i usvom containeru
    //Tacnije, to cumoci uraditi kada proslijedim ovu funkciju kao 2. argument u connect

    /*onIncrementCounter: ()=> dispatch({type: actionTypes.INCREMENT}),
  onDecrementCounter: ()=> dispatch({type: actionTypes.DECREMENT}),
  onSubCounter: ()=> dispatch({type: actionTypes.SUB, val:15}), 
  
  //Cesto se koristi payload umjesto ovog val. Mozemo imati koliko god zelim propertya poered typa
  //Ovom valu pristupamo preko action.val u reducer.js-u
  onAddCounter: ()=> dispatch({type: actionTypes.ADD, val: 10}),*/

    //value u payloadu bi trebala biti trenutna vrijednost Countera
    //payload nismo morali slati jer imamo vec u reduceru state i u njemu counter
    //ovo name se mora slagati sa name-om u reduceru u dijelu vezanom za ovu akciju

    //name, age, idAAA su isti. Samo sto su age i name stigli iz AddPErson komponente, a idAAA iz ove Persons.js. Oba su ovdje proslijedjena
    //preko funkcija koje se nalaze iznad. Samo su podaci u njima drugacije malo rasporedjeni. name, i age su definisani preko localState-a.
    //Zato sto nisu bili toliko bitni ovdje.

    //1) addIngredientHandler() i
    //2) removeIngredientHandler() ne postoje vise

    //onAddIngredient: (name) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: name, val: actionTypes.INGREDIENT_PRICE[name]}), //ovo name iz BuildControls stize, a val iz actions.js

    //payload mora iamti isto ime u reduceru i u akciji ovdje, val sluzi za updajtovanje cijene
    //onRemoveIngredient: (name) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: name, val: actionTypes.INGREDIENT_PRICE[name]}), //ovo name iz BuildControls stize, a val iz actions.js

    //payload mora iamti isto ime u reduceru i u akciji ovdje
    //onDeleteResult: (idAAA) => dispatch(actionCreators.deleteResult(idAAA))

    onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)), //name dolazi iz BuildControls preko ctrl.type

    onRemoveIngredient: (name) =>
      dispatch(actionCreators.removeIngredient(name)),

    onInitIngredients: () => dispatch(actionCreators.fetchIngredients()),

    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),

    onSetAuthRedirectPathBB: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)), // bitan je zbog redirektanja nakon sto kliknemo na submit u Auth.js. Mozemo ici nazad na burger ili na checkout.
  };
};

/*const mapDispatchToProps = {
  onAddIngredient: actionCreators.addIngredient,
  onRemoveIngredient: actionCreators.removeIngredient,
  onInitIngredients: actionCreators.fetchIngredients,
  onPurchaseInit: actionCreators.purchaseInit,
  onSetAuthRedirectPathBB: actionCreators.setAuthRedirectPath,
};*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios)); //axios za withErrorHandler HOC
