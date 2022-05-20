import React, {Component} from "react"
import NavBar from "./NavBarResidents"

export default class ContractsResident extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="1"/>
                <div className="content-container">
                    <h1>RESIDENTS CONTRACTS PAGE</h1>
                </div>
            </div>
        )
    }
}