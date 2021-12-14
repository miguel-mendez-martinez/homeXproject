import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"

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
                    {sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER ? <Link className="blue-button" to="/logInForm"> Login </Link> : null}
                    {sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER ? <Link className="green-button" to="/userForm"> Register </Link> : null}
                    {sessionStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to="/logOut"> LogOut </Link> : null }
                    <Link className="red-button" to="/resetDB"> Reset DB </Link>
                </div>
                <div className="grid-container">
                    
                </div>
            </div> 

        )
    }
}