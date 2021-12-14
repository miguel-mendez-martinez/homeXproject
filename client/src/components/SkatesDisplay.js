import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class DisplayAllCars extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            skates:[],
            mounted: false,
            redirectAddForm: false
        }
    }
    
   
    componentDidMount() 
    { 
        axios.get(`${SERVER_HOST}/DisplayAllSkates`)
        .then(res => 
        {
            if(res.data)
                    {
                        this.setState({skates: res.data}) 
                        this.setState({mounted: true})                   
                    }
                    else
                    {
                        console.log("Records not found")
                    }
        })                     
    }
   
 
    render() 
    {   
        return (           
            <div className="form-container">
                <div className = "header">
                    <Link to="/userForm"> Register </Link>
                </div>
                <div className="grid-container">
                    
                </div>
            </div> 
        )
    }
}