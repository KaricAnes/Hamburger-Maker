import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxic from '../../../hoc/Auxic/Auxilary';




const sideDrawer = (props) => {
//dodali smo i return je r zelimo da se nesto desi prije returnanja JSX coda
//radi se o css klasama koje ce definisati neku animaciju 

let attachedClasses = [classes.SideDrawer, classes.Closed];

if(props.show) {

  attachedClasses = [classes.SideDrawer, classes.Open];
  
}

return(

  <Auxic>

  <Backdrop show =  {props.show} clicked = {props.klik}/>

    <div className = {attachedClasses.join(' ')} onClick = {props.klik}>

      <div className = {classes.Logo}>
        <Logo/>
      </div>
  

  <nav>.
     <NavigationItems
      isAuth = {props.isAuth}/> 
  </nav>


    </div>

    </Auxic>


);
};

export default sideDrawer;