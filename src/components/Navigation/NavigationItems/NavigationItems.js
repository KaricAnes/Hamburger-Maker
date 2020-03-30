import React from 'react';
import classes from "./NavigationItems.module.css";
import NavigationItem from './NavigationItem/NavigationItem';







const navigationItems = (props) => {

//zelimo da se ova Autentifikacija vidi samo kada nismo logovani. A Logout da se vidi ako nismo logovani. 
//da bismo to uradili treba nam state u navigatioItem-u ali je glupa funkcionalna i ne mozemo je povezati sa Reduxom
//Mogli smo ovu komponentu pretvoriti u klasnu pa dole pozvati mapStateToProps ili ReactHooks da korsitimo  ali necemo to. 
//JEr bi nam to razbilo ideju o kontejnerima koji znaju za store, i glupim funkcionalnim koje ne znaju za store. 
//Umjesto toga otici cemo u parent component koja ucitava ovu komponentu: LAyout.js --> klasna pametna 
//Ustvari ona ucitava ToolBar i SideDrawer koji sadrze NavigationItems


//nakon  uspjesnog logina, baca nas na '/' ( uradj. u Auth.js kontejneru ). osim ako nismo prvo bildali burger. authRedirect

return(

<ul className = {classes.NavigationItems}>

<NavigationItem linkk = "/" >Burger Builder</NavigationItem>
{props.isAuth 
  ? <NavigationItem linkk = "/orderss"  >Narudžbe</NavigationItem>  
  : null}
{props.isAuth 
  ?  <NavigationItem linkk = "/logout">LogOut</NavigationItem>
  : <NavigationItem linkk = "/auth">SignIn/SignUp</NavigationItem>}


</ul>



)
};

export default navigationItems;