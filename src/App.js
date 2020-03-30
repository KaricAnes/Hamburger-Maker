import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Hamburger from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Orders from './containers/Orders/Orders';

import Auth from './containers/Auth/Auth';

import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux'; 
import * as actionCreators from './store/actions/index'; 




class App extends Component {
componentDidMount(){
  this.props.onTryAutoSignUp();
}

  render() { 

    let routes = (
      <Switch>
      <Route path = "/auth"  component = {Auth}/>
      <Route path = "/" exact component = {Hamburger}/>
      <Redirect to = '/' />
      </Switch>
        );

      if(this.props.isAuth) {

        routes = (
         <Switch>
         <Route path = "/checkoutt" component = {Checkout}/> 
           <Route path = "/auth"  component = {Auth}/>
             <Route path = "/orderss" component = {Orders}/>
               <Route path = "/logout" component = {Logout}/>
                 <Route path = "/" exact component = {Hamburger}/> 
                 <Redirect to = '/' />
                </Switch>
  
  
            )

      }




  return (

   /*  Switch se korsti da nam ne bi ucitalo vise ruta odjednom nego samo jednu, i to onu ciji put
    bude odgovarao. U Switchu je order ruta jako bitan. / uvijek treba biti zadnja.  
    KAda imamo switch poredak je jako bitan. I exact je moguce rjesenje ako ne zelimo korstiti switch
    Ako zelimo vise komponenti odjednom, onda moramo korsitiiti nested-routin g. 
    Nested Routing sluzi da bismo mogli ucitati nekoliko stvari odjednom: Checkot.js */




  <div>
     
    
     <Layout>
      {/*NAmjerno smo stavili da se ne zatvara sama jer je ideja iza cijelog Layouta da mozemo wrapati drugu komponentu sa njim */}

    {routes}
      

    </Layout>


         

  </div>
  );
}
}

const mapStateToProps = state => {
  return {
   isAuth : state.authR.token !== null

  }
}


const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
