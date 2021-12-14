import React, {Component} from "react"

import {Redirect, Link} from 'react-router-dom'

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class userForm extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect:false
        }

    }

    handleChange = event => {
        let campo = event.target.name

        switch(campo){
            case 'name':
                this.setState({name: event.target.value});
                break
            case 'email':
                this.setState({email: event.target.value});
                break
            case 'password':
                this.setState({password: event.target.value});
                break
            case 'confirm-password':
                this.setState({confirmPassword: event.target.value});
                break
            default: 
                break
        }
        
    }

    addUser = e => {

        //clientSide validation
        mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

        if(!this.state.email.match(mailPattern)){
            console.log('Email must be valid')
        }else if(!this.state.password.match(passWordPattern)){
            console.log('Password must have at least 6 characters, 1 number and 1 especial character.')
        }else if(!this.state.confirmPassword.match(this.state.password)){
            console.log('Passwords must match.')
        }else{
            axios.post(`${SERVER_HOST}/Users/resgister/${this.state.name}/${this.state.email}/${this.state.password}`)
            .then(res => 
            {
                if(res.data.errorMessage)
                {          
                    console.log(res.data.errorMessage)
                }else{
                    this.setState({redirect: !this.state.redirect})
                    console.log("Record added")
                }
            })
        }
    }

    cancelUser = e => {

        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null}
                <input id="name" type="text" name="name" placeholder="Name" onChange={this.handleChange}/><br/>
                <input id="email" type="text" name="email" placeholder="Email" onChange={this.handleChange}/><br/>
                <input id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/><br/>
                <input id="confirm-password" type="password" name="confirm-password" placeholder="Confirm password" onChange={this.handleChange}/><br/>
                <input type="button" value="Add User" onClick={this.addUser}/>
                {/* <input type="button" value="Cancel" onClick={this.cancelCar}/> */} {/* it should be a link */}
                <Link to="/DisplayAllSkates"> Cancel </Link>
            </div> 
        )
    }
}