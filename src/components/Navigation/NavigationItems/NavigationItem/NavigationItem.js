import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (

/*NavLink
ako hocemo da korsitimo NAvLink, u cssu mora biti klasa active a ne neko drugo ime
dodali smo ovaj activeClassName koji se moze dodati samo u NAvLinku. Dog ga nije bilo nije mi radio active Links
*/



<li className = {classes.NavigationItem}>
    <NavLink
       to={props.linkk}
       exact
       activeClassName = {classes.active}>{props.children}</NavLink>
</li>




);

export default navigationItem;