import React, {Component} from "react"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"
import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"

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

        if (window.performance) {
            if (performance.navigation.type === 1) {
                console.log( "This page is reloaded" );
                //when its reloaded, we check user privileges and change them to what should be
                //this is made in order to ban users from changing the web by changing their level of access
                if(localStorage.accessLevel >= ACCESS_LEVEL_GUEST){
                    console.log("validating user")
                    axios.defaults.withCredentials = true // needed for sessions to work
                    axios.post(`${SERVER_HOST}/DisplayAllSkates/validateUser`, {headers:{"authorization":localStorage.token}})
                    .then(res => 
                    {
                    if(res.data)
                        {
                            localStorage.accessLevel = res.data.accessLevel
                            console.log("Token and user verified and correctly set.")              
                        }
                    else
                        {
                            console.log("Error, token didnt reach.")
                        }
                    })  
                }else{
                    console.log("not validating user")
                }
            }else {
                console.log("This page is not reloaded");
            }
                    
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