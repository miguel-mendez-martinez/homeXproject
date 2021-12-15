import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"

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
                <div className = "header-container">
                    <div className="leftHeader">
                    <img src={require("../images/masterPiece.png")} alt=""/> 
                    </div>  
                    <div className="centerHeader">
                        <h2> All the Fat</h2>
                        <h6> From Skaters To Skaters</h6>
                    </div>
                    <div className="rightHeader">
                        {sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER ? <Link className="blue-button" to="/logInForm"> Login </Link> : null}
                        {sessionStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER ? <Link className="green-button" to="/userForm"> Register </Link> : null}
                        {sessionStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to="/logOut"> LogOut </Link> : null }
                        {/* <Link className="red-button" to="/resetDB"> Reset DB </Link> */}
                    </div>
                </div>
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