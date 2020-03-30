import * as actionTypes from './actionTypes';
import axios from 'axios';


//okida se u Auth.js -u u componentDidMountu() i BurgerBuilder.js-u u porucivanjeHandler -u. ide na authR.js reducer

export const authCheckState = () => {
    return dispatch => {
      const token = localStorage.getItem('token');

      if(!token) {
          dispatch(logout());
      }

      else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));//newDate iz stringa u date objekat ga konvertuje

         if(expirationDate <= new Date()) {
            dispatch(logout());
         }
         else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimout((expirationDate.getTime() - new Date().getTime())/1000)); 
             
         }
      }
    }
}

export const setAuthRedirectPath = (path) => {  //burgerBuilder, Auth.js 
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH, //sluzi nam da mozemo doci do reducera 
        path: path  //mora se podudarati sa reducerom
    };
};




//sluzi za setanje loadinga na True i postavljanje Spinera ako to budemo zeljeli 
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START //sluzi nam da mozemo doci do reducera 
    };
};

export const logout = () => { //Logout.js
    localStorage.removeItem('userId')
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
return {
    type: actionTypes.AUTH_LOGOUT
};
};


//asinq funkcija koja nakon 3600s poziva logout() 
export const checkAuthTimout = (expirationTime) => { //dispatch(checkAuthTimout(response.data.expiresIn))
 return dispatch => {
   setTimeout(() => {
    dispatch(logout()); //uvijek terba executati ove akcije pozivne 
   }, expirationTime *1000); //covert miliseconds to seconds
 };

};


export const authSuccess = (token, userId) => ({ //id of a newly created order
     type :  actionTypes.AUTH_SUCCESS, 
     idToken: token, //mora se poklapati idToken sa reducerom, //authR.js const authSuccess
     userId: userId
}); 


//
  export const authFailed = (error) => {
    return  {   //unutar ovog dispatcha mi mozemo executati asinq kod i dipatchati novu akciju kada se zavrsi taj asinq kod
     type: actionTypes.AUTH_FAIL,
     error: error
  
 }};



//asinq + 3 sinq-a

export const auth = (email, password, isSignUp) => {      //kada kliknemo na submit Button treba da se izvrsi
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password, 
            returnSecureToken: true    //evo kako dobije token 
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s';
        if (!isSignUp) { //defaultno true
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNGQWVK3ukVa8MyhMsvXIdeHg0zRTOq9s';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response); 
  
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); //milisec to sec
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId) //treba nam user Id zbog authCheckState i success u njemu koji se okida

            dispatch(authSuccess(response.data.idToken, response.data.localId));//authR.js const authSuccess
            dispatch(checkAuthTimout(response.data.expiresIn)); //
        
        })
        .catch(err => {
            console.log('error authA')
            dispatch(authFailed(err.response.data.error)); //redux DEV. error
          });
        
          };
 };











 