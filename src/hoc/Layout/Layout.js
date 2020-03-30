import React, {Component} from 'react'

import Auxic from '../Auxic/Auxilary';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/ToolBar/ToolBar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';





class Layout extends Component{

state = {

showSideDrawer:false

}


sideDrawerClosedHandler = () => {

    this.setState({showSideDrawer: false});


    }


    toggleSideDrawerHandler = () => {

        /*const doesShow = this.state.showSideDrawer;
        this.setState({showSideDrawer: !doesShow});*/

       /* this.setState({showSideDrawer: !this.state.showSideDrawer});   Ovaj moze izazvati nuspojave*/
        
        this.setState( (prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer};
        });


        }




    render(){

        



return(
<Auxic>

    <Toolbar 
    isAuth = {this.props.isAuthenticated}
    klik2 = {this.toggleSideDrawerHandler}/>

    <SideDrawer
     isAuth = {this.props.isAuthenticated}
     show = {this.state.showSideDrawer} klik = {this.sideDrawerClosedHandler}/>

     <main className = {classes.Content}>

     {this.props.children}

     </main>

</Auxic>

);
}

}

//subscription
//1. konfiguracija 
const mapStateToProps = state => {
  return{
    isAuthenticated: state.authR.token !== null
        }
}


export default connect(mapStateToProps, null)(Layout);

