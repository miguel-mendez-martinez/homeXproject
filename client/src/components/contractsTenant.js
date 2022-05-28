import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import ContractHolderTenant from "./ContractHolderTenant"
import NavBar from "./NavBar"

export default class ContractTenant extends Component 
{

    constructor(props) 
    {
        super(props)

        
        this.state = { 
            requested: null,
            signed: null,
            completed: null,
            mounted: false
        }
    }

    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/ContractsRequested`)
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
                    this.setState({requested: res.data})    
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }) 
        axios.get(`${SERVER_HOST}/ContractsSigned`)
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
                    this.setState({signed: res.data})    
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }) 
        axios.get(`${SERVER_HOST}/ContractsCompleted`)
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
                    this.setState({completed: res.data})    
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
            <div className="web-container"> 
                <NavBar selected="1"/>
                <div className="content-container">
                    <h1>TENANTS CONTRACTS PAGE</h1>

                    {this.state.requested ? 
                        <div className="contractsRequested">
                            <h2>Rent Requests</h2>
                            {this.state.requested.map((contract, index) => <ContractHolderTenant key={index} contract={contract}/>)}
                        </div> 
                    : null}
                    {this.state.signed ? 
                        <div className="contractsSigned">
                            <h2>Sign Requests</h2>
                            {this.state.signed.map((contract, index) => <ContractHolderTenant key={index+50} contract={contract}/>)}
                        </div> 
                    : null}
                    {this.state.requested ? 
                        <div className="contractsCompleted">
                            <h2>Active Contracts</h2>
                            {this.state.completed.map((contract, index) => <ContractHolderTenant key={index+100} contract={contract}/>)}
                        </div> 
                    : null}
                </div>
            </div>

        )
    }
}
