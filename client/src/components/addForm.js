import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"
import { Link } from "react-router-dom"

import axios from "axios"




export default class addForm extends Component 
{

    constructor(props) 
    {
        super(props)
        
        this.state = {
            type: '',
            size: 0,
            brand: '',
            price: 0,
            redirect: false
        }
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }


    addProduct = () =>{
        axios.post(`${SERVER_HOST}/DisplayAllSkates/${this.state.type}/${this.state.size}/${this.state.brand}/${this.state.price}`)
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
                    this.setState({redirect:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        }).catch(err =>{
            console.log(err.response.data)
        })
    }
 
    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null} 
                <label>Type:<input type="text" name="type" onChange={this.handleChange}/></label><br/>
                <label>Size:<input type="text" name="size" onChange={this.handleChange}/></label><br/>
                <label>Brand:<input type="text" name="brand" onChange={this.handleChange}/></label><br/>
                <label>Price:<input type="text" name="price" onChange={this.handleChange}/></label><br/>
                <input type="submit" value="submit" onClick={this.addProduct}></input>
                <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
            </div> 
        )
    }
}