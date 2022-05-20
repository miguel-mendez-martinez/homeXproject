import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import NavBar from "./NavBar"

export default class BillsTenant extends Component 
{
    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="2"/>
                <div className="content-container">
                    <h1>TENANTS BILLS PAGE</h1>
                </div>
            </div>

        )
    }
}
