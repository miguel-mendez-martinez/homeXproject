import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import NavBar from "./NavBar"

export default class HomeTenant extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="0"/>
                <div className="content-container">
                    <h1>TENANTS PAGE</h1>
                    
                <Link className="blue-button" to="/tenantAddPropForm">
                    <h1> Add New Property </h1>
                </Link>
                </div>
            </div>

        )
    }
}
