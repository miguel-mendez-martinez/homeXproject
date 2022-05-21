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
            errorMessage: '',
            images: []
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
        return {
            address: this.validateAdress(),
            area: this.validateArea(),
            price: this.validatePrice(),
        }

    }


    handleChange = e => {

        this.setState({[e.target.name]: e.target.value})

    }

    addProperty = e => {

        let formData = new FormData()  
        formData.append("address", this.state.address)
        formData.append("area", this.state.area)
        formData.append("price", this.state.price) 
        formData.append("tenant", this.state.tenant) 

        if(this.state.images)
        {
            for(let i = 0; i < this.state.images.length; i++)
            {
                formData.append("propertyImages", this.state.images[i])
            }
        }

        axios.post(`${SERVER_HOST}/Properties/AddNew`, formData, {headers:{"authorization":localStorage.token ,"Content-type": "multipart/form-data"}})
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
                    console.log("Record added")
                    this.setState({redirect: !this.state.redirect})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        }).catch(err =>{
            console.log("err:" + err.response.data) 
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

                    <div className="button-container">
                        <input type="button" className="green-button" value="Add Property" disabled = {!inputsAreAllValid} onClick={this.addProperty}/>
                    </div>              
                </div>
            </div>
        )
    }
}
