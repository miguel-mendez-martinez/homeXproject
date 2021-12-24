import React, {Component} from "react"

export default class skateHolder extends Component 
{

    constructor(props) 
    {
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            image: this.props.match.params.name,
            brand: this.props.match.params.brand,
            price: this.props.match.params.price
            
        }
    }

    render() 
    {   
        return (           
            <div className="skate-container">
                <img src={require(`../images/${this.state.image}.jpg`)} width="100" height="150"/>    
            </div> 
        )
    }
}