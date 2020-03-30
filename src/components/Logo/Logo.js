import React from 'react';
import logoB from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (

//Inline Styling za visinu
    <div className = {classes.Logo} style = {{height: props.height}}>

   <img src={logoB} alt="Hambas"/>

    </div>





);

export default logo;