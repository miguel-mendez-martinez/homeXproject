import React, {Component} from "react"
import NavBar from "./NavBarResidents"

export default class BillsResident extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="2"/>
                <div className="content-container">
                    <h1>RESIDENTS BILLS PAGE</h1>
                </div>
            </div>
        )
    }
}