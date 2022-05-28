import React, {Component} from "react"
import NavBar from "./NavBarResidents"
import axios from "axios"
import {Redirect, Link} from 'react-router-dom'
import PropertyHolderResident from "./PropertyHolderResident"
import {SERVER_HOST} from "../config/global_constants"

export default class HomeResident extends Component 
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
            url: `${SERVER_HOST}/Properties/resident`,
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
                    console.log(res.data)
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
                    <h1>RESIDENTS PAGE</h1>

                    <div className="propertiesGrid">
                        {this.state.mounted ? this.state.properties.map((property) => <PropertyHolderResident key={property._id} property={property}/>) : null}
                    </div>

                </div>
            </div>
        )
    }
}