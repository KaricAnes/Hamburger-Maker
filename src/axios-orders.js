import axios from 'axios';

/*Na ovaj link cemo slati requestove da bi storali podatke u nasu bazu podataka. */
/*Namjerno nismo podesili da  */


const instance = axios.create({
    baseURL: 'https://react-moj-hamburger.firebaseio.com/'
});

export default instance; 

