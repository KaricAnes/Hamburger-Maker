import React, {Component}  from 'react';
import Auxic from '../../hoc/Auxic/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControlls';
import Modal from '../../components/UI/Modal/Modal';
import Summary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
//import { Redirect } from 'react-router-dom';

import  { connect } from 'react-redux';
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
    porucljivo: false, /*Poruci Button */
    porucivanje: false, /*Modal */ //porucivanje, loading, error --> Local UI state managment
    loading: false, //spinner
    error: false
  };

  /*  7.2) u state-u u BurgerBuilder.js-u ingredients su bili null. Ali su postavljeni sa servera u
 **componentDidMount()**. Eh posto nismo jos ucili kako da radimo sa asynchronous kodom u reduceru,
to cemo za sada zakomentarisati i poslije se nekad vratiti na to. Sad za sad cemu reduceru state-u postaviti. */

//sada se logika ovog koda ispod nalazi u burgerBuilderA.js-- u actionCreatoru

  componentDidMount () {

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

  updatePorucljivoState(ingredients) {
   
    const sum = Object.keys(ingredients)
      .map(igKey => {
        //console.log('igKey: '+igKey);
        //console.log('ingredients[igKey]: '+ingredients[igKey]);
        return ingredients[igKey];

        //igKey poslije mapa je salata, ao ova dole notation je value npr:0;
      })

      //prosli put kad smo zvali reduce, radili smo da bude flatten
      //sada cemo ga pretvoriti u single number
      //0 je starting number ovdje
      //sum gore je finalni rezultat value-a nekog ingredienta.
      //element je broj: ingredients[igKey]

      .reduce((sum, el) => {
        //console.log("sum: " + sum, "el:" + el);

        // console.log('sum: '+ sum);
        return sum + el;
      }, 0);

    //console.log('sum: ' + sum);

    return sum > 0
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
    this.updatePorucljivoState(updatedIngredients);
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
    this.updatePorucljivoState(updatedIngredients);
  };*/

  porucivanjeHandler = () => { //orderNow button
    if(this.props.isAuth) {
          this.setState({ porucivanje: true });
    }
    else{
      this.props.onSetAuthRedirectPathBB('/checkoutt')//ne mozemo kliknuti na button ako nismo bildali
      this.props.history.push('/auth');
      //<Redirect to = '/auth'/> ne radi
    }
  };

  porucivanjeCancelHandler = () => {
    this.setState({ porucivanje: false });
  };

  porucivanjeContinueHandler = () => {
    //queryParams ingredientsi poslani u checkout

    
    

    //this.setState({loading:true})

    //const narudzba = {

    // ingredients:this.state.ingredients,
    // price:this.state.totalPrice,
    /*Da se radi o pravoj aplikaciji ne bismo ovako samo poslali cijenu, nego bi izvrsili i rekalkulaciju na samom serveru
dase uvjerimo da user nije manipulisao kodom */
    //customer: {

    // name: 'Sulejman Krpic',

    // address:{

    //  street: 'Mese Selimovica 85',
    //  zipCode: '71000',
    //   country: 'BiH'

    //        },
    //   email: 'sule.krpic@stu.ibu.edu.ba'

    //},
    //deliveryMethod: 'najbrza'
    //  }

    //axios.post( '/orders.json', narudzba )
    //.then(response => {
    //this.setState({loading:false, porucivanje:false}); //porucivanje --> modal
    //})
    //.catch(error => {
    //  this.setState({loading:false, porucivanje:false});
    //  });



//Odavdje pocinje slanje TotalPrice i ingredientsa u Checkout.js preko queryParamsa
    
    /*const queryParams = [];

    for (let i in this.state.ingredients) {
      //pushat cemo svaki ingredient u queryParams array
      //encodeURIComponent --> enkodira nase elemente tako da mogu biti korsiteni u url-u, whitespaces regulise i to
      //propertyName = value : salad = 2

      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    //total price kako je poslana
    queryParams.push("price=" + this.props.totPrice);

    //moramo ih joinati
    const queryString = queryParams.join("&"); */

    //klik na continue i baca nas na checkout

    this.props.onPurchaseInit();
    
    this.props.history.push({ pathname: "/checkoutt"
      //kako zelimo da proslijedimo ingredientse
      //search: "?" + queryString
    });
  };



  render() {
    //disabling Less buttona
    const disabledInfo = {
      //bukvalno kopiranje objekta na inmutable way
      ...this.props.ings   //this.state.ingredients
    };

    for (let key in disabledInfo) {
     // console.log(disabledInfo[key]);
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //{salad:true, meat:false...}
    //disabling Less buttona

    //alternativa

    let summary = null;

    let burger = this.props.error ? (
      <p>Sastojci ne mogu biti učitani!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) { //this.state.ingredients
      burger = (
        <Auxic>
          <Burger ingredients={this.props.ings} /> 

          <BuildControls
            ingredientAdded={this.props.onAddIngredient} //this.addIngredientHandler --> iz buildControls type stize
            ingredientOduzet={this.props.onRemoveIngredient} //this.removeIngredientHandler --> iz buildControls type stize
            disabled={disabledInfo}
            price={this.props.totPrice}
            porucljivo={/*this.state.porucljivo*/this.updatePorucljivoState(this.props.ings)}
            porucivanje={this.porucivanjeHandler}
            isAuth = {this.props.isAuth}
          />
        </Auxic>
      );

      summary = (
        <Summary
          ingredients={this.props.ings} //this.state.ingredients
          porucivanjeCanceled={this.porucivanjeCancelHandler}
          porucivanjeNastavljeno={this.porucivanjeContinueHandler}
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
          show={this.state.porucivanje}
          modalClosed={this.porucivanjeCancelHandler}
        >
          
          {summary}
        </Modal>
  
        {burger}
      </Auxic>
    );
  }
}

//1. konfiguracija
//subscription

const mapStateToProps = state => {
  return{
   ings: state.burgerBuilderR.ingredients, 
    totPrice: state.burgerBuilderR.totalPrice,
     error: state.burgerBuilderR.error,
      isAuth: state.authR.token !== null,
      building: state.burgerBuilderR.building
  };
};



//2. konfiguracija

//Akcije salju podatke na reducer.js
//Salju mu type i ostale propertije(optional)

const mapDispatchToProps = dispatch => {
  return{
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



onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)), 

onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),

onInitIngredients: () => dispatch(actionCreators.fetchIngredients()),

onPurchaseInit: () => dispatch (actionCreators.purchaseInit()),

onSetAuthRedirectPathBB: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
  }
  
  }


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); //axios za withErrorHandler HOC                                     