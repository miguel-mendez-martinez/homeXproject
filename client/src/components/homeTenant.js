import axios from "axios"
import React, {Component} from "react"
import {Redirect, Link} from 'react-router-dom'
import NavBar from "./NavBar"
import PropertyHolder from "./PropertyHolder"
import {SERVER_HOST} from "../config/global_constants"

export default class HomeTenant extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = { 
            properties: [], 
            mounted: false
        }
    }

    componentDidMount(){
        axios({
            method: "get",
            url: `${SERVER_HOST}/Properties/tenant/`,
            headers: { "authorization": localStorage.token },
        }).then(res => {
            //handle success
            if(res.data)
            {            
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    this.setState({properties: res.data})
                    this.setState({mounted: true})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        }).catch(err => {
            //handle error
            console.log(err)
        });
    }

    render() 
    {   
        return (       
            <div className="web-container"> 
                <NavBar selected="0"/>
                <div className="content-container">
                    <h1>TENANTS PAGE</h1>

                    <div className="propertiesGrid">
                        {this.state.mounted ? this.state.properties.map((property) => <PropertyHolder key={property._id} property={property}/>) : null}
                    </div>
                    
                <Link className="blue-button" to="/tenantAddPropForm">
                    <h1> Add New Property </h1>
                </Link>
                </div>
            </div>

        )
    }
}
