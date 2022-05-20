import React, {Component} from "react"
import NavBar from "./NavBarResidents"

export default class ProfileResident extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="3"/>
                <div className="content-container">
                    <h1>RESIDENTS PROFILE PAGE</h1>
                </div>
            </div>
        )
    }
}