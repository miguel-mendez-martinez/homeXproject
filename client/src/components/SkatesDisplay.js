import React, {Component} from "react"

import axios from "axios"

import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

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
                //when its reloaded, we check user privileges and change them to what should be
                //this is made in order to bane users from changing the web by changing their level of access
                if(localStorage.accessLevel >= ACCESS_LEVEL_GUEST + 5){ //el + 5 para q no entre pq resetea el accesLevel a 0 
                    console.log("validating user") //creo q se puede borrar pq es solo si estas usando sesiones en el server side

                    axios.defaults.headers.common['Authorization'] = localStorage.token;

                    axios.post(`${SERVER_HOST}/Users/validateUser`, { headers: { 'Authorization': `${localStorage.token}` } })
                    .then(res => 
                    {
                    if(res.data)
                        {
                            console.log(res.data)
                            localStorage.accessLevel = res.data.accessLevel
                            console.log("Token and user verified and correctly set.")              
                        }
                    else
                        {
                            console.log("Error, token didnt reach.")
                        }
                    })  
                }
            }else {
                console.log("This page is not reloaded");
            }
                    
            }
    }


    componentDidMount() 
    { 
        if(typeof this.props.location.state != 'undefined'){
            console.log(this.props.location.state.id)
        }
        

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
                    
                    {(localStorage.accessLevel === ACCESS_LEVEL_ADMIN) ? <Link className="blue-button" to="/addForm"> Add Product </Link> : null}

                    <div className="grid-container">
                        <h1>Products Here</h1>
                    </div>     
                </div>
                
            </div> 

        )
    }
}