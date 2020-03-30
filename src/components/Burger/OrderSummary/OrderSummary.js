import React, {Component} from 'react'
import Auxic from '../../../hoc/Auxic/Auxilary';
import Button from '../../UI/Button/Button';



    class OrderSummary extends Component{

//Moze biti i funkcionalna

//Ovo je modal ustvari 



componentDidUpdate(){
    //console.log('[OrderSumary] Did Update');
}




    render(){


        const ingredientSumamry = Object.keys(this.props.ingredients)
        .map(igKey => {
            return( <li key={igKey}>
                <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} 
                
                </li>
                
            )
          })


    return(
<Auxic>

        
    
        
    
    <h3>Tvoja Narudzba</h3>
    <p>Ukusni hamburger sa sljedećim sastojcima:</p>
    
    <ul>
    {ingredientSumamry}
    </ul>
    <p><strong>Cijena vase narudzbe je: {this.props.summaryCijena.toFixed(2)} KM</strong></p>
    <p>Continue to Checkout?</p>
    
    <Button btntype = "Danger" clicked = {this.props.porucivanjeCanceled}>ODUSTANI</Button>
    <Button btntype = "Success" clicked = {this.props.porucivanjeNastavljeno}>NASTAVI</Button>
    
    
        </Auxic>
    
    
    
    );
    
    
    
    
    };
    }


export default OrderSummary;