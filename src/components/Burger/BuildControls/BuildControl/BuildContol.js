import React from 'react';
import classes from './BuildControl.module.css';

const buildContol = (props) => (

<div className = {classes.BuildControl}>

    <div  className = {classes.Label}>{props.label}</div>
    <button
     className = {classes.Less}
     onClick = {props.oduzet}
      disabled={props.disabled}>Manje</button>
      
    <button className = {classes.More} onClick = {props.added}>Više</button>

</div>


);


export default buildContol;


