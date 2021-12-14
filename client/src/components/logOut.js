import React, {Component} from "react"
import {Redirect} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"

export default class LogOut extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            redirect: false
        }
    }
    
   
    componentDidMount() 
    { 
        axios.post(`${SERVER_HOST}/Users/logout`)
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
                    console.log("User logged out")
                    sessionStorage.clear()   
    
                    sessionStorage.name = "GUEST"
                    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
                }
            }
            else
            {
                console.log("Logout failed")
            }
        })                     
    }

    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null}
            </div> 
        )
    }
}