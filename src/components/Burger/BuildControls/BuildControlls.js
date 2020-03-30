import React from 'react';
import BuildControl from './BuildControl/BuildContol';
import classes from './BuildControls.module.css';


const controls = [

    {label: 'Salata', type: 'salad'},
    {label: 'Pećenica', type: 'bacon'},
    {label: 'Sir', type:'cheese'},
    {label: 'Meso', type:'meat'}

];

const buildControlls = (props) => {

//Namjernos smo stavili ove divove dole da bi smo mogli kontrolisati
//styling
return(

<div className = {classes.BuildControls}>

    <p>Trenutna Cijena: <strong>{props.price.toFixed(2)}</strong> KM</p>

{controls.map(ctrl =>  (   
    <BuildControl
     /* added = {props.addIngredientHandler}*/
      key = {ctrl.label}
      label = {ctrl.label}
      //type = {ctrl.type}
      added = {() => props.ingredientAdded(ctrl.type)} // ctrl.type --> ide u BurgerBuilder u akciju kao payload
      oduzet = {() => props.ingredientOduzet(ctrl.type)} // ctrl.type --> ide u BurgerBuilder u akciju kao payload
      disabled = {props.disabled[ctrl.type]}/>
    ))}

<button 

onClick = {props.porucivanje}
disabled = {!props.porucljivo}
className = {classes.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button> 

</div>



);
};

export default buildControlls;