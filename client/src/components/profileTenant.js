import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import NavBar from "./NavBar"

export default class ProfileTenant extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="4"/>
                <div className="content-container">
                    <h1>TENANTS PROFILE PAGE</h1>
                </div>
            </div>

        )
    }
}
