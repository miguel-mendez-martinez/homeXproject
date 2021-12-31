import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"
import { Link } from "react-router-dom"

import axios from "axios"
import WebHeader from "./WebHeader"




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
            selectedFiles: null,
            redirect: false
        }
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }

    addProduct = () =>{

        let formData = new FormData()  
        formData.append("type", this.state.type)
        formData.append("size", this.state.size)
        formData.append("brand", this.state.brand)
        formData.append("price", this.state.price) 

        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("productPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/DisplayAllSkates`, formData, {headers:{"authorization":localStorage.token ,"Content-type": "multipart/form-data"}})
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
            console.log(err.response) //No se p q con err.response.data me petaba la pagina
        })
    }
 
    render() 
    {   
        return (   
            
            <div className="web-container">
                <WebHeader/>
                <div className="form-container">
                    {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null} 
                    <label>
                        Type:{/* <input type="text" name="type" onChange={this.handleChange}/> */}
                        <div className="customSelect">
                            <select name="type" onChange={this.handleChange}>
                                <option value="Deck">Deck</option>
                                <option value="Trucks">Trucks</option>
                                <option value="Wheels">Wheels</option>
                            </select>
                        </div>
                        </label><br/>
                    <label>Size:<input type="text" name="size" onChange={this.handleChange}/></label><br/>
                    <label>Brand:<input type="text" name="brand" onChange={this.handleChange}/></label><br/>
                    <label>Price:<input type="text" name="price" onChange={this.handleChange}/></label><br/>
                    <input type = "file" multiple onChange = {this.handleFileChange}/><br/>
                    <input type="submit" value="submit" onClick={this.addProduct}></input>
                    <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
                </div> 
            </div>
        )
    }
}