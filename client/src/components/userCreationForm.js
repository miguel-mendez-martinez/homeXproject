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
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: 'Tenant',
            name: '',
            id: '',
            phoneNumber: '',
            redirect:false,
            userExitsError: false,
            errorMessage: ''
        }

    }

    componentDidMount()
    {
        this.inputToFocus.focus()
    }

    validateUserName() {
        if(this.state.userName === ""){
            return false
        }else{
            return true
        }
    }

    validateName() {
        if(this.state.name === ""){
            return false
        }else{
            return true
        }
    }

    validateId() {
        if(this.state.id === ""){
            return false
        }else{
            return true
        }
    }

    validatPhoneNumber() {
        if(this.state.id === ""){
            return false
        }else{
            return true
        }
    }

    validateEmail() {
        //this is from internet
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }
    
    validatePassword() {
        //we can make these more complex using ifs.
        if(this.state.password.length < 10 || !/[A-Z]/.test(this.state.password) || !/[a-z]/.test(this.state.password) || !/[0-9]/.test(this.state.password)
            || !/[£!#€$%^&*]/.test(this.state.password)){
                return false
            }else{
                return true
            }
    }

    validateConfirmPassword() {
        //if the states of passwords are the same, it means its all ok
        if(this.state.confirmPassword ===""){
            return false
        }
        if( this.state.password === this.state.confirmPassword)
            return true
        else    
            return false
    }

    validation(){
        //creamos un objeto 
        return {
            userName: this.validateUserName(),
            email: this.validateEmail(),
            password: this.validatePassword(),
            confirmPassword: this.validateConfirmPassword(),
            name: this.validateName(),
            id: this.validateId(),
            phoneNumber: this.validatPhoneNumber()
        }

    }


    handleChange = e => {

        this.setState({[e.target.name]: e.target.value})

    }

    addUser = e => {

        //clientSide validation
        const mailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|("."))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

        if(!this.state.email.match(mailPattern)){
            console.log('Email must be valid')
        }else if(!this.state.password.match(passwordPattern)){
            console.log('Password must have at least 6 characters, 1 number and 1 especial character.')
        }else if(!this.state.confirmPassword.match(this.state.password)){
            console.log('Passwords must match.')
        }else{
            //let formData = new FormData()  
            //we create the form for the registration
            /* formData.append("userName", this.state.userName)
            formData.append("email", this.state.email)
            formData.append("password", this.state.password)
            formData.append("name", this.state.name) 
            formData.append("id", this.state.id) 
            formData.append("phoneNumber", this.state.phoneNumber)  */
            
            console.log(this.state.password)

            //we post the changes into the database
            axios.post(`${SERVER_HOST}/Users/register/${this.state.userName}/${this.state.email}/${this.state.userType}/${this.state.name}/${this.state.id}/${this.state.phoneNumber}/${this.state.password}`)
            .then(res => 
            {

                localStorage.name = res.data.name
                localStorage.accessLevel = res.data.accessLevel
                localStorage.token = res.data.token

                this.setState({redirect: !this.state.redirect})
                console.log("Record added")

            }).catch((err) => 
            {
                this.setState({userExitsError: !this.state.userExitsError, errorMessage: err.response.data})
            })
        }
    }

    cancelUser = e => {
        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   

        let errorList = []
        if(this.state.password.length<10){
            errorList.push({id: 1, msg:"Password must be 10 digits long."})
        }
        if(!/[0-9]/.test(this.state.password)){
            errorList.push({id: 2, msg:"Password must contain a digit."})
        }
        if(!/[A-Z]/.test(this.state.password)){
            errorList.push({id: 3, msg:"Password must contain an uppercase."})
        }
        if(!/[a-z]/.test(this.state.password)){
            errorList.push({id: 4, msg:"Password must contain an lowercase."})
        }
        if(!/[£!#€$%^&*]/.test(this.state.password)){
            errorList.push({id: 5, msg:"Password must contain a special digit [£!#€$%^&*]."})
        }

        //errors
        let nameEmpty = <div className="error">Enter a name<br/></div>
        let emailErrorMessage = <div className="error">Enter a valid email<br/></div>
        let emailEmpty = <div className="error">Email is empty.<br/></div>
        let passwordErrorMessge = <div className="error"><ul> {errorList.map(error => <li key={error.id}> {error.msg} </li>)}</ul></div>
        let passwordConfirmErrorMessge = <div className="error">Passwords doesn't match<br/></div>
        const formInputsState = this.validation()
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]) 

        return (       
            
            <div className="web-container">
                {this.state.redirect ? <Redirect to="/"/> : null}
                <div className="logo-container">
                    <img src={require("../images/logo.png")} alt=""/>
                </div>
                <div className="form-container">
                    {this.state.userExitsError ? <div className="errorDiv">{this.state.errorMessage}</div> : null}

                    <div className="nameContainer">
                        <input className = {formInputsState.name ? "" : "error"}
                            id="userName" 
                            type="text" 
                            name="userName" placeholder="User Name" 
                            onChange={this.handleChange} ref = {input => {this.inputToFocus = input}}/>
                        <span className={formInputsState.userName ? "CorrectTick" : ""}>&#10004;</span>
                    </div>
                    {formInputsState.name ? "" : nameEmpty}
        
                    <div className="emailContainer">
                        <input className = {formInputsState.email ? "" : "error"} 
                            id="email" 
                            type="text" 
                            name="email" placeholder="Email" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.email ? "CorrectTick" : ""}>&#10004;</span>
                    </div>
                    {this.state.email === "" ? emailEmpty : formInputsState.email ? "" : emailErrorMessage}
                    
                    <div className="passwordContainer">
                        <input className = {formInputsState.password ? "" : "error"} 
                            id="password" 
                            type="password" 
                            name="password" placeholder="Password" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.password ? "CorrectTick" : ""}>&#10004;</span>
                    </div>
                    {formInputsState.password ? "" : passwordErrorMessge}

                    <div className="confirmPasswordContainer">
                        <input  className = {formInputsState.confirmPassword ? "" : "error"} 
                            id="confirmPassword" 
                            type="password" 
                            name="confirmPassword" placeholder="Confirm password" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.confirmPassword ? "CorrectTick" : ""}>&#10004;</span>
                    </div>
                    {formInputsState.confirmPassword ? "" : passwordConfirmErrorMessge}<br/>
                    
                    <div className="typeContainer">
                        <label>
                            Type:
                            <div className="customSelect">
                                <select name="userType" defaultValue="Tenant" onChange={this.handleChange}>
                                    <option value="Tenant">Tenant</option>
                                    <option value="Resident">Resident</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    
                    <div className="nameContainer">
                        <input  className = {formInputsState.name ? "" : "error"} 
                            id="name" 
                            type="text" 
                            name="name" placeholder="User's full name" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.name ? "CorrectTick" : ""}>&#10004;</span>
                    </div>

                    <div className="idContainer">
                        <input  className = {formInputsState.id ? "" : "error"} 
                            id="id" 
                            type="text" 
                            name="id" placeholder="User's ID" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.id ? "CorrectTick" : ""}>&#10004;</span>
                    </div>

                    <div className="phoneNumberContainer">
                        <input  className = {formInputsState.phoneNumber ? "" : "error"} 
                            id="phoneNumber" 
                            type="text" 
                            name="phoneNumber" placeholder="User's phone number" 
                            onChange={this.handleChange}/>
                        <span className={formInputsState.phoneNumber ? "CorrectTick" : ""}>&#10004;</span>
                    </div>

                    <input type="button" className="green-button" value="Add User" disabled = {!inputsAreAllValid} onClick={this.addUser}/>
                    {/* <input type="button" value="Cancel" onClick={this.cancelCar}/> */} {/* it should be a link */}
                    <Link className="red-button" to="/LogInForm"> Cancel </Link>
                </div> 
            </div>
        )
    }
}