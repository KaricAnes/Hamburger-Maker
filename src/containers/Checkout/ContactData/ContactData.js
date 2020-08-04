import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
//import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    //JS objekat
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tvoje ime",
        },
        value: "", //formData = {name: name.value, street: street.value, zipCode: "12345", country: "BiH", email: "df"}
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ulica",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Poštanski broj",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Država",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: " E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Najbrža" },
            { value: "cheapest", displayValue: "Najjeftinija" },
          ],
        },
        //ova je samo defaultna, dok je nije bilo ako ne odaberemo nista
        //na server se ne posalje nista
        value: "fastest",
        //morali smo dodati prazan validation, jer bez njega bude erroe kada odaberemo neku opciju
        validation: {},
        valid: true,
        //ovdje nismo dodali validaciju jer svakko moramo nesto izabrati
      },
    },
    //loading:false,  sada je preko Reduxa
    formIsValid: false, //button order ce biti disabled ako je neki input field invalid
  };

  orderHandler = (event) => {
    //ingredients nemam ovdje, ali ih imam u checkoutu. Preko rute od tamo su prsit
    //contact data a nemam state za njih
    //total price

    event.preventDefault();

    //KAo sto i samo ime govori, formData su uneseni podaci iz forme, a koje smo dobili preko value-a

    const formData = {}; //formData = {name: name.value, street: street.value, zipCode: "12345", country: "BiH", email: "df"}
    for (let formElementIdentifier in this.state.orderForm) {
      //debugger;
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;

      console.log("formData" + formData);
      //bukvalno cemo u formData imati key value pairs. for (let formElementIdentifier in this.state.orderForm). formElementIdentifier je bitan.
      //Pomocu njega u novoformirani objekat formData ubacimo keyeve iz state-a.

      //console.log('formElementIdentifier '+formElementIdentifier);  name, street, zipCode, mail, deliveryMEthod...

      /*//ove ce ustvari biti poslano na Firebase
 country: "kkk"
deliveryMethod: "kk"
email: ""
name: ""
street: ""
zipCode: ""
*/
    }

    //this.setState({loading:true})

    const narudzba = {
      //Poslano sa Checkout.js-a --- sada je sa reduxa
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId, //saljemo na server da bismo poslije mogli prikazati useru samo njegove narudzbe
    };

    this.props.onOrderBurger(narudzba, this.props.token);

    /*axios.post( '/orders.json', narudzba )
.then(response => {
this.setState({loading:false});
//withRouter
this.props.history.push('/');

})
.catch(error => {
  this.setState({loading:false});
  });*/
  };

  //value i rules su poslani iz funkcije inputChangedHandler:
  //updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation );
  checkValidity(value, rules) {
    let isValid = true;
    //morao sam settati na true jer ne bi proslo ovu prvu

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
      //isValid ce postati true ako trimmied value nije jednaka praznom stringu
      //trim() uklanja white spaces na pocetku i na kraju
      //isValid vraca true ili false
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //Naravno, nije bio dovoljan samo event jer imamo vise elemenata koji sadrze value pa smo morali
    //proslijediti i ovaj inputIdentifier  da znamo u koji value tacno da upisemo nesto

    //console.log(event.target.value);

    const updatedOrderForm = {
      //na ovaj nacin smo klonirali samo deliveryMethod, country, email, name, street  npr. ali ne i ostale nested podatke
      //moramo deeply klonirati da ne bismo samo referencirali na nested podatke
      //ukoliko to ne uradimo, samo cemo kopitrati pointere na nested data

      ...this.state.orderForm,
    };
    //console.log(updatedOrderForm);

    //deeply kloniranje

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
      //sada mozemo safely promjeniti vrijednost od updatedOrderForm
      //elemntConfig nije zahvacen  na ovaj nacin, ali nam on i ne treba
      //da je trebao samo bi napravili jos jedan blok ovog kloniranja
      //elementType, value
    };
    //console.log(updatedFormElement);
    //console.log(updatedFormElement.value);

    updatedFormElement.value = event.target.value;

    //validity, koristili smo element zato da mozemo sici da dohvatimo podatke
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;

    //elementType, value              = elementType, value: nova vrijednost, linija 133
    //posto ja zelim citavu formu zamjeniti, a ne samo element
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    //console.log(updatedFormElement);

    //da li je citava forma validna

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      //inputIdentifier: name, street, zipcode, country
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; //updatedOrderForm[inputIdentifier]: elementConfig, elmentType, value, validation
      //da bismo izbjegli zamku gdje se samo zadnji pika, mi smo dodali && formIsValid i setali ga inicijalno na true
      //a u state-u na false
    }
    //console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    // Moramo objeakt iz state-a pretvoriti u array da bi smo mogli loopati kroz njega
    //naravno napravili smo prazan array
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      //key je street, name, mail...
      formElementsArray.push({
        //novi objekat cemo pushati, ne stari
        id: key,
        //elementConfig: key.elementConfig,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            //posaljemo invalid samo ako je true
            invalid={!formElement.config.valid}
            //Ako nije settana validacija shouldValidate ce biti false /rules
            shouldValidate={formElement.config.validation}
            //shouldValidate varaca true ili false u zavisnosti da li je postavljen validation
            //za dropDown on nije postavljen
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button btntype="Success" disabled={!this.state.formIsValid}>
          Poruči
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Unesite Vaše podatke</h4>

        {form}
      </div>
    );
  }
}

//1. konfiguracija
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderR.ingredients,
    price: state.burgerBuilderR.totalPrice,
    loading: state.orderR.loading,
    token: state.authR.token,
    userId: state.authR.userId, //ovdje preuzmemo userID sa authR-a, saljemo preko akcije onOrderBurger na server da bismo poslije mogli
    //prikazati useru samo njegove narudzbe
  };
};

//2. konfiguracija

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token)), //orderData ings, formData, price, usrID - auth
  };
};

//157 --> withRouter
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));

/*
Ovdje se vidi smisao REDUX-a. 
ings i totalPrice mi treabaju i u BurgerBuilder-u i u ContactData.js i u Checkout.js 

Sada su oni dostupni bez vecih problema zato sto se nalaze u REDUX-u

tip: 
inhs i totalPrice mi trebaju i u ContactData.js-u zato sto od tamo saljem naraudzbu plus ContactData 
*/
