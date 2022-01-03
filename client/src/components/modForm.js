import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"
import { Link } from "react-router-dom"

import axios from "axios"
import WebHeader from "./WebHeader"




export default class modForm extends Component 
{

    constructor(props) 
    {
        super(props)

        
        this.state = {
            type:'',
            size: 0,
            brand: '',
            price: 0,
            mounted: false,
            redirect: false
        }
    }

    componentDidMount(){
        axios.get(`${SERVER_HOST}/DisplayAllSkates/get/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {   
                    this.setState({type: res.data.type})
                    this.setState({size: res.data.size})
                    this.setState({brand: res.data.brand})
                    this.setState({price: res.data.price})
                    this.setState({mounted: true})
                    console.log(this.state)
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    modProduct = e =>{

        const product = {type: this.state.type, size: this.state.size, brand: this.state.brand, price: this.state.price } 
        axios.put(`${SERVER_HOST}/DisplayAllSkates/${this.props.match.params.id}`, product, {headers:{"authorization":localStorage.token}})
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
            
            <div className="web-container">

                <WebHeader/>

                <div className="form-container">
                    {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null} 
                    <label>
                        Type:
                        <div className="customSelect">
                            <select name="type" defaultValue="Deck" onChange={this.handleChange}>
                                <option value="Deck">Deck</option>
                                <option value="Trucks">Trucks</option>
                                <option value="Wheels">Wheels</option>
                            </select>
                        </div>
                        </label><br/>
                    <label>Size:<input type="text" name="size" onChange={this.handleChange} value={this.state.size}/></label><br/>
                    <label>Brand:<input type="text" name="brand" onChange={this.handleChange} value={this.state.brand}/></label><br/>
                    <label>Price:<input type="text" name="price" onChange={this.handleChange} value={this.state.price}/></label><br/>
                    <input type="submit" value="submit" onClick={this.modProduct}></input>
                    <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
                </div> 
            </div>
            
        )
    }
}