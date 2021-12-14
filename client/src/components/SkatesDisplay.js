import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"

import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

export default class SkateDisplay extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            skates:[],
            mounted: false,
            redirectAddForm: false
        }
    }
    
   
    componentDidMount() 
    { 
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.get(`${SERVER_HOST}/DisplayAllSkates`)
        .then(res => 
        {
            if(res.data)
                    {
                        this.setState({skates: res.data}) 
                        this.setState({mounted: true})                   
                    }
                    else
                    {
                        console.log("Records not found")
                    }
        })                     
    }
   
 
    render() 
    {   
        return (           
            <div className="form-container">
                <div className = "header">
                    <Link className="blue-button" to="/logInForm"> Login </Link>
                    <Link className="green-button" to="/userForm"> Register </Link>
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to="/userForm"> LogOut </Link> : null }
                </div>
                <div className="grid-container">
                    
                </div>
            </div> 
        )
    }
}