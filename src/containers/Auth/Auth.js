import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actionCreatorsAuth from '../../store/actions/index';
import {connect} from 'react-redux'; 
import { Redirect } from 'react-router-dom';



class Auth extends Component {
  
    state = {
      controls: {
        email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Mail Adresa'
            },
            value: '', 
            validation: {
              required: true,
              //isEmail: true //ako bude errora neplanskih do njega je
            }, 
            valid: false,
            touched:false
         },

         password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'Šifra'
            },
            value: '', 
            validation: {
              required: true,
              isEmail: true, //ako bude errora neplanskih do njega je
              minLength: 6  // na firebase-u je minimum 6 karaktera
            }, 
            valid: false,
            touched:false
         }
      },
      isSignUp: true 

    }
//pomocu ovog ispod resetamo path/url svaki put kada dodjemo do auth page a da nismo nabildali burger prethodno 
    componentDidMount() {
    if(!this.props.building && this.props.authRedirectPath !== '/'){
      this.props.onSetAuthRedirectPath('/');
    }
    }

    checkValidity(value, rules){
        let isValid = true;
        //morao sam settati na true jer ne bi proslo ovu prvu 
      
        if(rules.required){
         isValid = value.trim() !== '' && isValid;
      //isValid ce postati true ako trimmied value nije jednaka praznom stringu 
      //trim() uklanja white spaces na pocetku i na kraju 
      //isValid vraca true ili false
        }
      
        if(rules.minLength) {
          isValid = value.length  >= rules.minLength && isValid;
        }
      
        if(rules.maxLength) {
          isValid = value.length  <= rules.maxLength && isValid;
        }
      
        return isValid;
      }


//inputChangedHandler malo drugaciji od onog u ContactData.js kontejneru

      inputChangedHandler = (event, controlName) => {
        const updatedControls = {

          ...this.state.controls,

          [controlName]: {

            ...this.state.controls[controlName], 
            value: event.target.value,
             valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true  //kada god se okine inputChangedHandler touched ce biti true


          }

        }
        this.setState({controls: updatedControls})

      }

submitHandler = (event) => {

event.preventDefault(); //sprecavanje reloadinga stranice

this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

}

switchAuthModeHandler = () => {
  this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp};
  })

}


  render () {


// Moramo objeakt iz state-a pretvoriti u array da bi smo mogli loopati kroz njega
//naravno napravili smo prazan array

const formElementsArray = [];

for (let key in this.state.controls) {
  //key je email, password, ...
  formElementsArray.push({
      //novi objekat cemo pushati, ne stari
      id: key, 
      //elementConfig: key.elementConfig,
      config: this.state.controls[key]
      
    });

  }




  let form = formElementsArray.map(formElement => (

   <Input
   
   key = {formElement.id} //iz ovog gore arraya iznad
     elementType = {formElement.config.elementType}
      elementConfig = {formElement.config.elementConfig}
       value = {formElement.config.value}
        //posaljemo invalid samo ako je true 
          invalid = {!formElement.config.valid}
           //Ako nije settana validacija shouldValidate ce biti false /rules
            shouldValidate = {formElement.config.validation}
            //shouldValidate varaca true ili false u zavisnosti da li je postavljen validation
            //za dropDown on nije postavljen
              touched = {formElement.config.touched}
                changed = {(event) =>this.inputChangedHandler(event, formElement.id)}
             
   
   />
    
   
  ));

  
  if(this.props.loading) {
    form = <Spinner/>
}

//ukoliko smo se ulogovali, idemo na '/checkout' ili '/'. 

let authRedirect = null;

if(this.props.isAuth) {
  authRedirect = <Redirect to = {this.props.authRedirectPath}/>
}



let errorMessage = null;




if(this.props.error) {
    errorMessage = (
        <p style={{color:'red'}}>{this.props.error.message}</p>
    )
}

   return (

<div className = {classes.Auth}>
     
    {errorMessage}
    {authRedirect}

    <form onSubmit = {this.submitHandler}>
       {form}
        <Button btntype = "Success">SUBMIT</Button>
    </form>

    <Button
     clicked = {this.switchAuthModeHandler}
     btntype = "Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
</div>


   );
  }
}

const mapStateToProps = state => {
    return{
    loading: state.authR.loading,
    error: state.authR.error,
    isAuth: state.authR.token !== null,
    building: state.burgerBuilderR.building,
    authRedirectPath: state.authR.authRedirectPath
    }
}


const mapDipatchToProps = dispatch => {
  return{
    onAuth: (email, password, isSignUp) => dispatch(actionCreatorsAuth.auth(email, password, isSignUp)),// nas actionCreator auth ocekuje tri argumenta
    onSetAuthRedirectPath: (path) => dispatch(actionCreatorsAuth.setAuthRedirectPath(path))
     
    //onAuth zelimo da okinemo kada god kliknemo na button submit 
    
    
  }

  

}

export default connect(mapStateToProps, mapDipatchToProps)(Auth); 