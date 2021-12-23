import React, {Component} from "react"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import WebHeader from "./WebHeader"


export default class SkateDisplay extends Component 
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
        axios.defaults.withCredentials = true // needed for sessions to work
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
            <div className="web-container">
                <WebHeader/>
                <div className="content-container">
                    <div className="category-container">
                        <h2>Categories here</h2>
                    </div>

                    <div className="grid-container">
                        <h1>Products Here</h1>
                    </div>     
                </div>
                
            </div> 

        )
    }
}