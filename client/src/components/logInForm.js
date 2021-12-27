import React, {Component} from "react"

import {Redirect, Link} from 'react-router-dom'

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"
import WebHeader from "./WebHeader"

export default class logInForm extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = {
            email: '',
            password: '',
            redirect:false
        }

    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    

    logInUser = e => {   
        axios.post(`${SERVER_HOST}/Users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            console.log("User logged in")
                    
            localStorage.name = res.data.name
            localStorage.accessLevel = res.data.accessLevel
            localStorage.token = res.data.token
            
            this.setState({redirect:true})
        }).catch(err=>
            {
            localStorage.name = "GUEST"
            localStorage.accessLevel = ACCESS_LEVEL_GUEST 
            console.log(err)
            this.setState({redirect:false})
        })
    }

    cancelUser = e => {

        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   
        return (      
            
            <div className="web-container">

                <WebHeader/>

                <div className="form-container">
                    {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null}
                    <h2> Users Log In </h2>

                    <input id="email" type="text" name="email" placeholder="Email" onChange={this.handleChange}/><br/>
                    <input id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/><br/>
                    <input type="button" className="green-button" value="Log In" onClick={this.logInUser}/>
                    {/* <input type="button" value="Cancel" onClick={this.cancelCar}/> */} {/* it should be a link */}
                    <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
                </div>
            </div> 
        )
    }
}