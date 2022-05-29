import React, {Component} from "react"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import ContractTenantModal from "./ContractModal.js"

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
        axios.get(`${SERVER_HOST}/Properties/${this.state.contract.property}`)
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
                    this.setState({property: res.data})    
                    this.setState({mounted: true})  
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }) 
    }
    
    confirm = e => {
        //confirming a contract will open a form of contract to change some data and send it to the resident 
        this.setState({modal: !this.state.modal})
    }

    complete = e => {

    }

    contact = e => {
        console.log('Comunicating...')
    }

    showModal(){
        this.setState({modal: !this.state.modal})
    }
    
    render() 
    {
        return (
            <div className="contract">
                {this.state.mounted ? 
                    <><div className="propertyName">
                        {this.state.property.address}
                    </div>
                    <div className="contractMainImage">
                        {this.state.mounted ? <img id={this.state.picture} src={`data:;base64,${this.state.picture}`} alt="Loading..." /> : null}
                    </div>
                    <div className="contractInfo">
                        {this.state.property.price}
                    </div>
                    <div className="buttons">
                        {this.state.contract.status == 'requested' ? <input type="button" className="green-button" value="Accept" onClick={this.confirm} /> : null}
                        {this.state.contract.status == 'sign' ? <input type="button" className="green-button" value="Complete" onClick={this.complete} /> : null}
                        {this.state.contract.status == 'completed' ? <input type="button" className="green-button" value="Contact" onClick={this.contact} /> : null}
                    </div></> : null}

                    {this.state.modal ? <ContractTenantModal 
                                        contract = {this.state.contract}
                                        property = {this.state.property}
                                        closeModal = {this.showModal.bind(this)}
                                      /> : null} 
            </div>        
        )
    }
}