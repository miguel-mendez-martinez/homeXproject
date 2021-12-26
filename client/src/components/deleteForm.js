import React, {Component} from "react"
import {Redirect} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class SkateDisplay extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            redirect: false
        }
    }
    
   
    componentDidMount() 
    { 
        axios.delete(`${SERVER_HOST}/DisplayAllCars/${this.state.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {

            if(res.data)
            {          
                this.setState({redirect: !this.state.redirect})
            }else{
                console.log("Record not deleted")
            }
        })                    
    }

    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllCars"/> : null}
            </div> 
        )
    }
}