import React, {Component} from 'react'

import Auxic from '../Auxic/Auxilary';

import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/ToolBar/ToolBar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';




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
     klik2 = {this.toggleSideDrawerHandler}/>

    <SideDrawer
     show = {this.state.showSideDrawer}
     klik = {this.sideDrawerClosedHandler}/>

     <main className = {classes.Content}>

     {this.props.children}

     </main>

</Auxic>

);
}

}
export default Layout;

