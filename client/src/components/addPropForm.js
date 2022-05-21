import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import NavBar from "./NavBar"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class addPropForm extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = {
            tenant: localStorage.email,
            address: '',
            area: '',
            price: '',
            redirect:false,
            propExitsError: false,
            errorMessage: ''
        }

    }

    componentDidMount()
    {
        this.inputToFocus.focus()
    }

    validateAdress() {
        if(this.state.address === ""){
            return false
        }else{
            return true
        }
    }

    validateArea() {
        if(this.state.area === "" && this.state.area <= 0){
            return false
        }else{
            return true
        }
    }

    validatePrice() {
        if(this.state.price === "" && this.state.price <= 0){
            return false
        }else{
            return true
        }
    }

    validation(){
        //creamos un objeto 
        return {
            address: this.validateAdress(),
            area: this.validateArea(),
            price: this.validatePrice(),
        }

    }


    handleChange = e => {

        this.setState({[e.target.name]: e.target.value})

    }

    addUser = e => {

        //clientSide validation
        let encodedPass = encodeURIComponent(this.state.password, "UTF-8")
        //we post the changes into the database
        axios.post(`${SERVER_HOST}/Properties/AddNew`)
        .then(res => 
        {

            localStorage.email = res.data.email
            localStorage.accessLevel = res.data.accessLevel
            localStorage.token = res.data.token

            this.setState({redirect: !this.state.redirect})

        }).catch((err) => 
        {
            this.setState({userExitsError: !this.state.userExitsError, errorMessage: err.response.data})
        })
    }

    cancelProperty = e => {
        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   
        //errors
        let addressEmpty = <div className="error">Enter a valid address.</div>
        let validPrice = <div className="error">Enter a valid price.</div>
        let validArea = <div className="error">Enter a valid area.</div>

        //validation
        const formInputsState = this.validation()
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]) 

        return (       
            <div className="web-container"> 
                {this.state.redirect ? <Redirect to="/tenantHome"/> : null}
                <NavBar selected="0"/>
                <div className="content-container">
                    <div className="item-container">
                        <input className = {"form-control" ? "" : "error"}
                            id="address" 
                            type="text" 
                            name="address" placeholder="Property Adress" 
                            onChange={this.handleChange} ref = {input => {this.inputToFocus = input}}/>
                    </div>
                    {formInputsState.address ? "" : addressEmpty}

                    <div className="item-container">
                        <input className = {"form-control" ? "" : "error"}
                            id="area" 
                            type="number" 
                            name="area" placeholder="Property Area" 
                            onChange={this.handleChange}/>
                    </div>
                    {formInputsState.area ? "" : validArea}
                
                    <div className="item-container">
                        <input className = {"form-control" ? "" : "error"}
                            id="price" 
                            type="number" 
                            name="price" placeholder="Property Price" 
                            onChange={this.handleChange}/>
                    </div>
                    {formInputsState.price ? "" : validPrice}
                </div>
            </div>
        )
    }
}
