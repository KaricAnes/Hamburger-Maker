import React, {Component} from 'react'
import classes from './Modal.module.css';
import Auxic from '../../../hoc/Auxic/Auxilary';
import Bacdrop from '../Backdrop/Backdrop';


class Modal extends Component{



    

/*Ovo ispod se treba updajtovati, samo kada je show state promijenjeno*/

    shouldComponentUpdate(nextProps, nextState){

    /*if(nextProps.show !== this.props.show) {
        return true;
    }*/

    /*Spinner nije radio dok nismo ovo dole rijesili*/
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

   
    componentDidUpdate(){
       // console.log('[Modal] Did Update');
    }


render(){    
return(

<Auxic>

<Bacdrop show = {this.props.show} clicked = {this.props.modalClosed}/>
    
<div className = {classes.Modal}

style = {{

    transform:this.props.show ? 'translateY(0)' : 'translateY(-110vh)',
    opacity: this.props.show ? '1' : '0'

}}>

    {this.props.children}

</div>

</Auxic>


)
}
};

export default Modal;