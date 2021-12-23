import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"
import { Link } from "react-router-dom"

import axios from "axios"




export default class modForm extends Component 
{

    constructor(props) 
    {
        super(props)
        
        this.state = {
            size: this.props.match.params.size,
            brand: this.props.match.params.brand,
            price: this.props.match.params.price,
            redirect: false
        }
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    modCar = e =>{
        const product = {size: this.state.size, brand: this.state.brand, price: this.state.price } //No se si dará problemas no pasar el type al hacer el $set en el route
        axios.put(`${SERVER_HOST}/DisplayAllSkates/${this.props.match.params.id}`, product)
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
                    this.setState({redirect: true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }

 
    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null} 
                <label>Size:<input type="text" name="size" onChange={this.handleChange} value={this.state.size}/></label><br/>
                <label>Brand:<input type="text" name="brand" onChange={this.handleChange} value={this.state.brand}/></label><br/>
                <label>Price:<input type="text" name="price" onChange={this.handleChange} value={this.state.price}/></label><br/>
                <input type="submit" value="submit" onClick={this.addProduct}></input>
                <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
            </div> 
        )
    }
}