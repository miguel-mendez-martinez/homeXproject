import React, {Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"

export default class ContractHolderTenant extends Component 
{

    constructor(props) 
    {
        super(props)

        
        this.state = { 
            contract: this.props.contract,
            property: null,
            picture: '',
            mounted: false,
            modal: false
        }
    }

    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/Properties/${this.contract.property._id}`)
        .then(res => 
        {
            if(res.data)
            {            
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    this.setState({property: res.data[0]})    
                    this.setState({mounted: true})  
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }) 
    }
    
    
    render() 
    {
        return (
            <div className="contract">
                <div className="propertyName">
                    {this.state.property.address}
                </div>
                <div className="contractMainImage">
                    {this.state.mounted ? <img id={this.state.picture} src={`data:;base64,${this.state.picture}`} alt="Loading..."/> : null}
                </div>
                <div className="contractInfo">
                    {this.state.property.price}
                </div>    
                <div className="buttons">
                    {this.state.contract.status == 'requested'? <input type="button" className="green-button" value="Accept" onClick={this.confirm}/> : null} 
                    {this.state.contract.status == 'sign'? <input type="button" className="green-button" value="Complete" onClick={this.complete}/> : null}  
                    {this.state.contract.status == 'completed'? <input type="button" className="green-button" value="Contact" onClick={this.contact}/> : null}   
                </div>      
            </div>        
        )
    }
}