import React, {Component} from "react"
import {Redirect} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

export default class deleteForm extends Component 
{
    constructor(props) 
    {
        super(props)

        
        this.state = {
            redirect: false
        }
    }
    
   
    componentDidMount() 
    { 
        axios.delete(`${SERVER_HOST}/DisplayAllCars/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {          
                this.setState({redirect: true})
                console.log("Record deleted")
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