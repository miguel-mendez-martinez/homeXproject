import React, {Component} from "react"
import NavBar from "./NavBarResidents"

export default class HomeTenant extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="0"/>
                <div className="content-container">
                    <h1>RESIDENTS PAGE</h1>
                </div>
            </div>
        )
    }
}