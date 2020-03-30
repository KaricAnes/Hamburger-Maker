import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxic from '../Auxic/Auxilary';

//Funkcija koja prihvata wrappedComponent kao input 
//a koja vraca funkciju koja prima propsa onda vraca naravno JSX
//axios nam treba da bismo mogli postaviti globalni errorHandler

const witErrorHandler = (WrappedComponent, axios) => {

return class extends Component {
    state = {
        error:null
    }

    constructor(props) {
        super(props);
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error:null});
            return req;
        });

        /*Ovaj error je iz firebasea, to je ustvari objekat koji sadrzi error message */
    this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})

    });    
    }


    componentWillUnmount() {

       
axios.interceptors.request.eject(this.reqInterceptor);
axios.interceptors.response.eject(this.resInterceptor);

    }

    errorConfirmedHandler = () => {
this.setState({error:null})

    }

    render() {

        return (
            <Auxic>
            
                <Modal
                show = {this.state.error}
                modalClosed = {this.errorConfirmedHandler}>
                   {this.state.error ? this.state.error.message : null}>

                </Modal>
            
                
                <WrappedComponent {...this.props}/>
            
            
            
            </Auxic>        
                );
            }
            
            
            }

    }




  

    

export default witErrorHandler;